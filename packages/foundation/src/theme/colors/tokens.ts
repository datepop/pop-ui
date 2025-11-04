/**
 * Design System Color Tokens
 *
 * token.json에서 추출된 색상 팔레트
 * 모든 색상은 global.color에서 정의됩니다.
 */

import tokenData from '../../../token.json';

export interface IColorShades {
  [shade: string]: string;
}

export interface IColorPaletteType {
  [colorName: string]: IColorShades;
}

interface ITokenValue {
  value: string;
  type: string;
}

const rawColors = tokenData.global.color;

export const colors: IColorPaletteType = Object.entries(rawColors).reduce(
  (acc, [colorName, shades]) => {
    acc[colorName] = Object.entries(shades as Record<string, ITokenValue>).reduce(
      (shadeAcc, [shade, tokenValue]) => {
        shadeAcc[shade] = tokenValue.value;
        return shadeAcc;
      },
      {} as IColorShades,
    );
    return acc;
  },
  {} as IColorPaletteType,
);

export type TColorName = keyof typeof colors;

export type TColorShade<T extends TColorName> = keyof (typeof colors)[T];

export const colorNames = Object.keys(colors) as TColorName[];

export const getColorShades = (colorName: TColorName): IColorShades => {
  return colors[colorName];
};

export const getColorValue = (colorName: TColorName, shade: string): string | undefined => {
  return colors[colorName]?.[shade];
};

export const getCSSVariableName = (colorName: string, shade: string): string => {
  return `--color-${colorName}-${shade}`;
};

export const getCSSVariableRef = (colorName: string, shade: string): string => {
  return `var(${getCSSVariableName(colorName, shade)})`;
};
