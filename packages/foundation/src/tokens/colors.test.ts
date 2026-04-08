import transformedTokenData from '../../transformed-token.json';
import * as foundationExports from '../index';
import * as generatedColors from './colors';

const countColorTokens = (value: unknown): number => {
  if (!value || typeof value !== 'object') {
    return 0;
  }

  if (
    'type' in value &&
    'value' in value &&
    value.type === 'color' &&
    typeof value.value === 'string'
  ) {
    return 1;
  }

  return Object.values(value).reduce((total, entry) => total + countColorTokens(entry), 0);
};

describe('generated foundation color tokens', () => {
  it('exports one generated constant for every color token in token.json', () => {
    const expectedColorTokenCount = countColorTokens(transformedTokenData);

    expect(Object.keys(generatedColors)).toHaveLength(expectedColorTokenCount);
  });

  it('keeps generated values normalized and re-exported from the package entrypoint', () => {
    expect(generatedColors.ColorWhite).toBe('#ffffff');
    expect(generatedColors.ColorAqua600).toBe('#11badd');
    expect(generatedColors.ShadowDashboardCardColor).toBe('#0000000a');

    expect(foundationExports.ColorAqua600).toBe(generatedColors.ColorAqua600);

    Object.values(generatedColors).forEach((value) => {
      expect(value).toMatch(/^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/);
    });
  });
});
