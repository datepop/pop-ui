import assert from 'node:assert/strict';
import test from 'node:test';
import { inspectControlTokens } from './penpot-control-tokens.mjs';
import { compareCatalog, compareSnapshots, extractCatalog } from './check-penpot-components.mjs';

const fileId = '746ae1de-283e-8110-8008-f91083966ac9';
const group = {
  name: 'SearchBar',
  path: 'Forms',
  axes: ['size', 'state'],
  variants: [
    ['sm', 'default'],
    ['sm', 'error'],
    ['md', 'default'],
    ['md', 'error'],
  ],
};
const catalog = (components) => ({ fileId, components });
const contract = new Map([
  ['SearchBar', { axes: { size: ['sm', 'md'] }, states: ['default', 'error'] }],
]);
test('requires every field state at each supported size', () => {
  assert.deepEqual(compareCatalog(contract, catalog([group])), []);
  assert.deepEqual(
    compareCatalog(contract, catalog([{ ...group, variants: group.variants.slice(1) }])),
    ['Missing: SearchBar size=sm state=default'],
  );
});
test('reports unexpected public names and duplicate component and variant definitions', () => {
  const duplicate = { ...group, variants: [...group.variants, group.variants[0]] };
  const issues = compareCatalog(
    contract,
    catalog([group, duplicate, { ...group, name: 'HotelSearchBar' }]),
  ).join('\n');
  assert.match(issues, /Duplicate family: SearchBar/);
  assert.match(issues, /duplicate variant: SearchBar/);
  assert.match(issues, /Unexpected Penpot name: HotelSearchBar/);
});
test('detects replaced combinations and regrouping while ignoring axis order and unrelated file revisions', () => {
  const baseline = catalog([group]);
  const permuted = catalog([
    {
      ...group,
      axes: ['state', 'size'],
      variants: group.variants.map(([size, state]) => [state, size]),
    },
  ]);
  assert.deepEqual(compareSnapshots(baseline, { ...permuted, revision: 2 }), []);
  assert.equal(
    compareSnapshots(baseline, catalog([{ ...group, variants: group.variants.slice(1) }])).length,
    1,
  );
  assert.ok(compareSnapshots(baseline, catalog([{ ...group, path: 'Hotel' }])).length);
});

test('rejects duplicated visible input error layers in a live Penpot main instance', () => {
  const file = {
    id: fileId,
    revn: 1,
    data: {
      components: {
        c: { id: 'c', name: 'SearchBar', mainInstancePage: 'page', mainInstanceId: 'master' },
      },
      pagesIndex: {
        page: {
          id: 'page',
          name: 'Components',
          objects: {
            master: { mainInstance: true, componentId: 'c', shapes: ['a', 'b'] },
            a: { name: 'InputWrapper-error' },
            b: { name: 'InputWrapper-error' },
          },
        },
      },
    },
  };
  assert.throws(() => extractCatalog(file), /Duplicate input error layer: SearchBar/);
  file.data.pagesIndex.page.objects.b.hidden = true;
  assert.equal(extractCatalog(file).components.length, 1);
  // A migrated or duplicated library keeps the same contract under another file id.
  file.id = 'copy';
  const copy = extractCatalog(file);
  assert.equal(copy.fileId, 'copy');
  assert.deepEqual(compareCatalog(new Map(), copy), compareCatalog(new Map(), { ...copy, fileId }));
});

test('rejects replacing a semantic binding with its equal-valued palette color', () => {
  const tokens = {
    size: { control: { sm: { $type: 'sizing', $value: '30px' } } },
    color: { action: { primary: { background: { $type: 'color', $value: '{color.aqua.500}' } } } },
  };
  const master = {
    id: 'button',
    componentId: 'c',
    mainInstance: true,
    appliedTokens: {
      height: 'size.control.sm',
      fill: 'color.action.primary.background',
    },
  };
  const page = { id: 'p', name: 'Components', objects: { button: master } };
  const file = {
    data: {
      tokensLib: { global: tokens },
      pagesIndex: { p: page },
      components: {
        c: {
          id: 'c',
          name: 'Button',
          mainInstancePage: 'p',
          mainInstanceId: 'button',
          variantProperties: Object.entries({
            state: 'default',
            size: 'sm',
            variant: 'primary',
          }).map(([name, value]) => ({ name, value })),
        },
      },
    },
  };
  assert.equal(extractCatalog(file).controlTokens['color.action.primary.background'].bindings, 1);
  master.appliedTokens.fill = 'color.aqua.500';
  assert.throws(() => extractCatalog(file), /Expected color.action.primary.background/);
});

test('requires the shared typography token on every medium Button label', () => {
  const label = {
    type: 'text',
    name: 'Label',
    appliedTokens: { typography: 'typography.control.label.md' },
  };
  const page = {
    id: 'p',
    objects: {
      b: { id: 'b', shapes: ['l'], appliedTokens: { height: 'size.control.md' } },
      l: label,
    },
  };
  const data = {
    components: {
      c: {
        name: 'Button',
        mainInstancePage: 'p',
        mainInstanceId: 'b',
        variantProperties: [{ name: 'size', value: 'md' }],
      },
    },
    tokensLib: {
      global: {
        size: { control: { md: { $value: '40px' } } },
        typography: { control: { label: { md: { $type: 'typography' } } } },
      },
    },
  };
  assert.equal(inspectControlTokens({ data }, page)['typography.control.label.md'].bindings, 1);
  delete label.appliedTokens.typography;
  assert.throws(() => inspectControlTokens({ data }, page), /Expected typography.control.label.md/);
});

test('requires field interaction variants for each default size and label placement', () => {
  const family = {
    name: 'Dropdown',
    path: 'Core / Inputs',
    axes: ['size', 'state', 'labelPosition'],
    variants: ['top', 'left'].flatMap((position) =>
      ['default', 'hover', 'focus', 'keyboardFocus'].map((state) => ['md', state, position]),
    ),
  };
  const contract = new Map([['Dropdown', { axes: { size: ['md'] }, states: ['default'] }]]);
  assert.deepEqual(compareCatalog(contract, catalog([family])), []);
  family.variants.pop();
  assert.deepEqual(compareCatalog(contract, catalog([family])), [
    'Missing field interaction: Dropdown md, keyboardFocus, left',
  ]);
});

test('rejects swapping equal-valued error message and border tokens', () => {
  const page = {
    id: 'p',
    objects: {
      master: { shapes: ['field', 'message'] },
      field: {
        type: 'rect',
        name: 'Input-input',
        appliedTokens: { strokeColor: 'color.border.error' },
      },
      message: {
        type: 'text',
        name: 'InputWrapper-error',
        appliedTokens: { fill: 'color.text.error' },
      },
    },
  };
  const error = { $type: 'color', $value: '{color.red.600}' };
  const data = {
    components: {
      search: {
        name: 'SearchBar',
        mainInstancePage: 'p',
        mainInstanceId: 'master',
        variantProperties: [{ name: 'state', value: 'error' }],
      },
    },
    tokensLib: { global: { color: { border: { error }, text: { error } } } },
  };
  assert.equal(inspectControlTokens({ data }, page)['color.text.error'].bindings, 1);
  page.objects.message.appliedTokens.fill = 'color.border.error';
  assert.throws(() => inspectControlTokens({ data }, page), /Expected color.text.error/);
});
