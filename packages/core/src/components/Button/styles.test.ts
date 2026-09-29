import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { compile } from 'sass';

const compiledCss = compile(
  join(dirname(fileURLToPath(import.meta.url)), 'styles.module.scss'),
).css;

const getDeclarations = (selector: string): Record<string, string> => {
  const blockStart = compiledCss.indexOf(`${selector} {`);

  expect(blockStart).toBeGreaterThanOrEqual(0);

  const block = compiledCss.slice(
    compiledCss.indexOf('{', blockStart) + 1,
    compiledCss.indexOf('}', blockStart),
  );

  return Object.fromEntries(
    block
      .split(';')
      .map((declaration) => declaration.split(':').map((part) => part.trim()))
      .filter(([property, value]) => property && value),
  );
};

describe('Button styles', () => {
  it('keeps the warning focus-visible text colour consistent with the other warning states', () => {
    const base = getDeclarations('.Button--Warning');
    const hover = getDeclarations('.Button--Warning:hover:not(:disabled)');
    const focus = getDeclarations('.Button--Warning:focus-visible:not(:disabled)');

    expect(focus.color).toBe(base.color);
    expect(focus.color).toBe(hover.color);
    expect(focus.color.toLowerCase()).not.toBe('#ffffff');
    expect(focus.color).not.toBe(focus['background-color']);
  });
});
