import { readFile, writeFile } from 'node:fs/promises';

const source = JSON.parse(
  await readFile(new URL('../packages/foundation/token.json', import.meta.url), 'utf8'),
);

const weights = {
  Thin: '100',
  ExtraLight: '200',
  Light: '300',
  Regular: '400',
  Medium: '500',
  SemiBold: '600',
  Bold: '700',
  ExtraBold: '800',
  Black: '900',
};

function convertToken({ type, value, description = '' }, path) {
  let penpotType = type;
  let penpotValue = value;
  const alias = typeof value === 'string' && /^\{[^{}]+\}$/.test(value);

  switch (type) {
    case 'color':
    case 'textDecoration':
      break;
    case 'borderRadius':
    case 'borderWidth':
    case 'fontSizes':
    case 'spacing':
    case 'sizing':
      if (/^-?\d+(?:\.\d+)?$/.test(value)) penpotValue = `${value}px`;
      break;
    case 'fontFamilies':
      penpotValue = Array.isArray(value) ? value : [value];
      break;
    case 'fontWeights':
      penpotValue = weights[value] ?? value;
      break;
    case 'lineHeights':
      penpotType = 'number';
      if (typeof value === 'string' && value.endsWith('%')) {
        penpotValue = String(Number(value.slice(0, -1)) / 100);
      }
      break;
    case 'typography':
      if (!alias) {
        penpotValue = {
          fontFamilies: [value.fontFamily],
          fontSizes: value.fontSize,
          fontWeights: value.fontWeight,
          lineHeights: value.lineHeight,
          letterSpacing: value.letterSpacing ?? '0',
          textCase: value.textCase ?? 'none',
          textDecoration: value.textDecoration ?? 'none',
        };
      }
      break;
    case 'boxShadow':
      penpotType = 'shadow';
      if (!alias) {
        const shadows = Array.isArray(value) ? value : [value];
        penpotValue = shadows.map(({ x, y, blur, spread, color, type: shadowType }) => ({
          offsetX: x,
          offsetY: y,
          blur,
          spread,
          color,
          inset: shadowType === 'innerShadow',
        }));
      }
      break;
    default:
      throw new Error(`Unsupported token type "${type}" at ${path}`);
  }
  return { $value: penpotValue, $type: penpotType, $description: description };
}

function convertGroup(group, path) {
  return Object.fromEntries(
    Object.entries(group).map(([key, entry]) => {
      const name = `${path}.${key}`;
      return [
        key,
        Object.hasOwn(entry, 'value') ? convertToken(entry, name) : convertGroup(entry, name),
      ];
    }),
  );
}

const sets = Object.entries(source).filter(
  ([name, group]) => !name.startsWith('$') && Object.keys(group).length,
);
const output = Object.fromEntries(sets.map(([name, group]) => [name, convertGroup(group, name)]));
output.$themes = source.$themes ?? [];
output.$metadata = {
  ...source.$metadata,
  tokenSetOrder: (source.$metadata?.tokenSetOrder ?? Object.keys(output)).filter(
    (name) => Object.hasOwn(output, name) && !name.startsWith('$'),
  ),
};

const json = JSON.stringify(output, null, 2) + '\n';
if (process.argv[2]) await writeFile(process.argv[2], json);
else process.stdout.write(json);
