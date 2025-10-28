/**
 * Design System Color Tokens
 *
 * token.json에서 추출된 색상 팔레트
 * 모든 색상은 global.color에서 정의됩니다.
 */

import tokenData from '../../../../../token.json';

export interface ColorShades {
  [shade: string]: string;
}

export interface ColorPalette {
  [colorName: string]: ColorShades;
}

const rawColors = tokenData.global.color;

export const colors: ColorPalette = Object.entries(rawColors).reduce(
  (acc, [colorName, shades]) => {
    acc[colorName] = Object.entries(shades as Record<string, any>).reduce(
      (shadeAcc, [shade, tokenValue]) => {
        shadeAcc[shade] = tokenValue.value;
        return shadeAcc;
      },
      {} as ColorShades
    );
    return acc;
  },
  {} as ColorPalette
);

export type ColorName = keyof typeof colors;

export type ColorShade<T extends ColorName> = keyof typeof colors[T];

export const colorNames = Object.keys(colors) as ColorName[];

export const getColorShades = (colorName: ColorName): ColorShades => {
  return colors[colorName];
};

export const getColorValue = (
  colorName: ColorName,
  shade: string
): string | undefined => {
  return colors[colorName]?.[shade];
};

export const getCSSVariableName = (colorName: string, shade: string): string => {
  return `--color-${colorName}-${shade}`;
};

export const getCSSVariableRef = (colorName: string, shade: string): string => {
  return `var(${getCSSVariableName(colorName, shade)})`;
};
