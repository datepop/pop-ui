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

const relativeLuminance = (hex: string): number => {
  const [red, green, blue] = [1, 3, 5].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;

    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (foreground: string, background: string): number => {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a,
  );

  return (lighter + 0.05) / (darker + 0.05);
};

describe('Button styles', () => {
  it('keeps the warning focus state text readable against its background (WCAG AA 4.5:1)', () => {
    const focus = getDeclarations('.Button--Warning:focus-visible:not(:disabled)');

    expect(contrastRatio(focus.color, focus['background-color'])).toBeGreaterThanOrEqual(4.5);
  });
});
