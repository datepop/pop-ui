import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

import { isDeepStrictEqual } from 'node:util';
import { convertToken } from './export-penpot-tokens.mjs';
import { inspectControlTokens } from './penpot-control-tokens.mjs';

// 라이브 조회 대상. 검증은 파일 ID 가 아니라 Components 페이지와 컴포넌트 계약으로 한다.
const liveFileId = '746ae1de-283e-8110-8008-f91083966ac9';
const snapshot = new URL('../docs/penpot-components.json', import.meta.url);
const root = fileURLToPath(new URL('../', import.meta.url));
const fieldStates = JSON.parse(
  readFileSync(new URL('../.storybook/examples/field-states.json', import.meta.url)),
);

export function extractCatalog(file) {
  const pages = Object.values(file.data.pagesIndex).filter((page) => page.name === 'Components');
  if (pages.length !== 1) throw new Error('Expected one Components page.');
  const [page] = pages;
  const groups = new Map();
  for (const component of Object.values(file.data.components)) {
    if (component.deleted || component.mainInstancePage !== page.id) continue;
    const master = page.objects[component.mainInstanceId];
    if (!master?.mainInstance || master.componentId !== component.id) {
      throw new Error(`Missing main instance for ${component.name}: ${component.id}`);
    }
    const errorLayers = (master.shapes ?? [])
      .map((id) => page.objects[id])
      .filter((layer) => layer && !layer.hidden && layer.name === 'InputWrapper-error');
    if (errorLayers.length > 1) {
      throw new Error(
        `Duplicate input error layer: ${component.name} (${component.mainInstanceId})`,
      );
    }
    const groupId = component.variantId ?? component.id;
    const axes = (component.variantProperties ?? []).map((property) => property.name).sort();
    const group = groups.get(groupId) ?? {
      name: component.name,
      path: component.path,
      axes,
      variants: [],
    };
    if (
      group.name !== component.name ||
      group.path !== component.path ||
      JSON.stringify(group.axes) !== JSON.stringify(axes) ||
      new Set(axes).size !== axes.length
    ) {
      throw new Error(`Inconsistent family name, path or axes: ${component.name}`);
    }
    const props = Object.fromEntries(
      (component.variantProperties ?? []).map(({ name, value }) => [name, value]),
    );
    group.variants.push(axes.map((axis) => props[axis]));
    groups.set(groupId, group);
  }
  const components = [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'));
  for (const group of components)
    group.variants.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b), 'en'));
  return {
    fileId: file.id,
    revision: file.revn,
    components,
    controlTokens: inspectControlTokens(file, page),
  };
}

export function readCodeContract() {
  const entries = ['core', 'editor'].map((pkg) => resolve(root, 'packages', pkg, 'src/index.ts'));
  const options = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    skipLibCheck: true,
    paths: { '@pop-ui/foundation': [resolve(root, 'packages/foundation/src/index.ts')] },
  };
  const program = ts.createProgram(entries, options);
  const checker = program.getTypeChecker();
  const contract = new Map();
  for (const path of entries) {
    const source = program.getSourceFile(path);
    for (const symbol of checker.getExportsOfModule(checker.getSymbolAtLocation(source))) {
      const name = symbol.getName();
      if (
        name.endsWith('Provider') ||
        (!/^[A-Z]/.test(name) && !['toast', 'getMarkerHTML'].includes(name))
      )
        continue;
      const [call] = checker.getTypeOfSymbolAtLocation(symbol, source).getCallSignatures();
      if (!call) continue;
      const propsSymbol = call.getParameters()[0];
      const props = propsSymbol && checker.getTypeOfSymbolAtLocation(propsSymbol, source);
      const axes = {};
      for (const axis of [
        'size',
        'variant',
        'labelPosition',
        ...(name === 'getMarkerHTML' ? ['type'] : []),
      ]) {
        const prop = props?.getProperty(axis);
        // Only POP-UI's declared finite axes are a promise made by the library.
        if (
          !prop?.declarations?.some((d) =>
            d.getSourceFile().fileName.startsWith(resolve(root, 'packages') + '/'),
          )
        )
          continue;
        const type = checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(prop, source));
        const literals = type.isUnion() ? type.types : [type];
        if (literals.every((t) => t.isStringLiteral())) axes[axis] = literals.map((t) => t.value);
      }
      // These props are the opt-in to the common input states exercised in Storybook.
      const description = props?.getProperty('description');
      const field = description?.declarations?.some((d) =>
        d.getSourceFile().fileName.endsWith('/components/shared/field.ts'),
      );
      contract.set(name === 'getMarkerHTML' ? 'MapMarker' : name, {
        axes,
        states: field ? fieldStates : [],
      });
    }
  }
  return contract;
}

export function compareCatalog(contract, catalog) {
  if (typeof catalog.fileId !== 'string' || !Array.isArray(catalog.components))
    throw new Error('Invalid POP-UI snapshot.');
  const findings = [];
  const seen = new Set();
  for (const { name, path, axes, variants } of catalog.components) {
    if (seen.has(name)) findings.push(`Duplicate family: ${name} (${path})`);
    seen.add(name);
    const expected = contract.get(name);
    if (!expected) findings.push(`Unexpected Penpot name: ${name} (${path})`);
    if (!variants.length || new Set(axes).size !== axes.length)
      findings.push(`Invalid family: ${name}`);
    const keys = new Set();
    for (const row of variants) {
      const key = JSON.stringify(row);
      if (row.length !== axes.length || keys.has(key))
        findings.push(`Invalid or duplicate variant: ${name} ${key}`);
      keys.add(key);
    }
    if (!expected) continue;
    for (const [axis, values] of Object.entries(expected.axes)) {
      const index = axes.indexOf(axis);
      const found = new Set(variants.map((row) => row[index]));
      for (const value of values)
        if (!found.has(value)) findings.push(`Missing: ${name} ${axis}=${value}`);
      for (const value of found)
        if (value !== undefined && !values.includes(value))
          findings.push(`Unexpected: ${name} ${axis}=${value}`);
    }
    if (name === 'Button') {
      for (const size of expected.axes.size) {
        for (const variant of expected.axes.variant) {
          if (
            !variants.some(
              (row) =>
                row[axes.indexOf('size')] === size && row[axes.indexOf('variant')] === variant,
            )
          )
            findings.push('Missing Button size=' + size + ' variant=' + variant);
        }
      }
    }
    if (name === 'TextField' || name === 'Dropdown') {
      if (name === 'TextField' && !axes.includes('type')) {
        findings.push('Missing field axis: TextField type');
      }
      const states =
        name === 'Dropdown'
          ? ['default', 'hover', 'focus', 'keyboardFocus']
          : ['default', 'hover', 'focus'];
      for (const size of expected.axes.size) {
        for (const labelPosition of expected.axes.labelPosition) {
          for (const type of name === 'TextField' ? ['input', 'textarea'] : [undefined]) {
            for (const state of states) {
              const props = type
                ? { size, state, labelPosition, type }
                : { size, state, labelPosition };
              const required = Object.entries(props);
              if (
                !variants.some((row) =>
                  required.every(([axis, value]) => row[axes.indexOf(axis)] === value),
                )
              ) {
                findings.push(
                  'Missing field interaction: ' + name + ' ' + Object.values(props).join(', '),
                );
              }
            }
          }
        }
      }
    }
    for (const size of expected.axes.size ?? [undefined]) {
      for (const state of expected.states) {
        if (
          !variants.some(
            (row) => row[axes.indexOf('state')] === state && row[axes.indexOf('size')] === size,
          )
        )
          findings.push(`Missing: ${name} size=${size} state=${state}`);
      }
    }
  }
  for (const name of contract.keys())
    if (!seen.has(name)) findings.push(`Missing Penpot family: ${name}`);
  return findings;
}

// Compare component paths and every state combination, independent of file revision.
export function compareSnapshots(previous, current) {
  const rows = (catalog) =>
    new Set(
      catalog.components.flatMap(({ name, path, axes, variants }) =>
        variants.map((row) =>
          JSON.stringify([
            path,
            name,
            ...axes.map((axis, i) => [axis, row[i]]).sort(([a], [b]) => a.localeCompare(b)),
          ]),
        ),
      ),
    );
  const before = rows(previous);
  const after = rows(current);
  return [
    ...[...before].filter((key) => !after.has(key)).map((key) => 'Removed from Penpot: ' + key),
    ...[...after].filter((key) => !before.has(key)).map((key) => 'Added in Penpot: ' + key),
  ];
}

// Check every link of a color alias, including the final palette value.
export function comparePaletteSources(bindings, source, penpot) {
  const findings = [];
  const checked = new Set();
  for (const [role, definition] of Object.entries(bindings)) {
    if (definition.type !== 'color') continue;
    let name = role;
    while (name && !checked.has(name)) {
      checked.add(name);
      const path = name.split('.');
      const expected = path.reduce((node, part) => node?.[part], source);
      const actual = path.reduce((node, part) => node?.[part], penpot);
      if (expected?.type !== 'color' || actual?.$type !== 'color' || actual.$value !== expected.value) {
        findings.push('Inconsistent color source: ' + name);
        break;
      }
      name = /^\{([^{}]+)\}$/.exec(expected.value)?.[1];
    }
  }
  return findings;
}

async function main(args) {
  const fromFile = args.indexOf('--from-file');
  let catalog;
  let file;
  if (args.includes('--live')) {
    const token = process.env.PENPOT_ACCESS_TOKEN;
    if (!token) throw new Error('Set PENPOT_ACCESS_TOKEN to read the live POP-UI file.');
    const response = await fetch('https://design.datepop.co.kr/api/rpc/command/get-file', {
      method: 'POST',
      redirect: 'error',
      signal: AbortSignal.timeout(60000),
      headers: {
        Authorization: `Token ${token}`,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({ id: liveFileId }),
    });
    if (!response.ok) throw new Error(`Penpot get-file returned ${response.status}`);
    file = await response.json();
  } else if (fromFile >= 0)
    file = JSON.parse(readFileSync(args[fromFile + 1], 'utf8'));
  else catalog = JSON.parse(readFileSync(snapshot, 'utf8'));
  if (file) catalog = extractCatalog(file);
  const findings = compareCatalog(readCodeContract(), catalog);
  const { global } = JSON.parse(
    readFileSync(resolve(root, 'packages/foundation/token.json'), 'utf8'),
  );
  const expected = [
    'color.aqua.800',
    'color.border.default',
    'color.border.hover',
    'color.border.focus',
    'color.border.error',
    'color.text.error',
    'color.text.placeholder',
    'typography.control.label.md',
    'color.action.primary.background',
    ...Object.keys(global.size.control).map((size) => 'size.control.' + size),
  ];
  for (const name of expected) {
    const source = name.split('.').reduce((entry, key) => entry?.[key], global);
    const actual = catalog.controlTokens?.[name];
    if (
      !actual?.bindings ||
      !source ||
      actual.type !== source.type ||
      !isDeepStrictEqual(actual.value, convertToken(source, name).$value)
    )
      findings.push('Missing or inconsistent control token: ' + name);
  }
  if (file)
    findings.push(
      ...comparePaletteSources(catalog.controlTokens, global, file.data.tokensLib.global),
    );
  if ((fromFile >= 0 || args.includes('--live')) && !args.includes('--write')) {
    findings.push(...compareSnapshots(JSON.parse(readFileSync(snapshot, 'utf8')), catalog));
  }
  if (findings.length) throw new Error(findings.join('\n'));
  if (args.includes('--write')) {
    if (!args.includes('--live') && fromFile < 0)
      throw new Error('Provide a fresh Penpot source with --write.');
    if (!Number.isSafeInteger(catalog.revision) || catalog.revision < 0)
      throw new Error('Expected a nonnegative integer Penpot revision.');
    // One line per family keeps generated variant changes reviewable.
    writeFileSync(
      snapshot,
      `{\n  "fileId": "${catalog.fileId}",\n  "revision": ${catalog.revision},\n  "controlTokens": ${JSON.stringify(catalog.controlTokens)},\n  "components": [\n    ${catalog.components.map((c) => JSON.stringify(c)).join(',\n    ')}\n  ]\n}\n`,
    );
  }
  console.log(
    `POP-UI · revision ${catalog.revision} · ${catalog.components.length} families · ${catalog.components.reduce((n, c) => n + c.variants.length, 0)} variants`,
  );
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
