/**
 * Mantine Theme Configuration
 *
 * CSS Variables를 활용한 Mantine 테마 설정
 */

import { createTheme } from '@mantine/core';
import { colors, getCSSVariableRef } from '@pop-ui/foundation';

import type { MantineColorsTuple } from '@mantine/core';

const createColorTuple = (colorName: string): MantineColorsTuple => {
  const shades = colors[colorName];
  const shadeKeys = Object.keys(shades).sort((a, b) => Number(a) - Number(b));

  // MantineColorsTuple은 정확히 10개의 요소를 가진 튜플
  const tuple: [string, string, string, string, string, string, string, string, string, string] = [
    getCSSVariableRef(colorName, shadeKeys[0] || shadeKeys[shadeKeys.length - 1]),
    getCSSVariableRef(colorName, shadeKeys[1] || shadeKeys[shadeKeys.length - 1]),
    getCSSVariableRef(colorName, shadeKeys[2] || shadeKeys[shadeKeys.length - 1]),
    getCSSVariableRef(colorName, shadeKeys[3] || shadeKeys[shadeKeys.length - 1]),
    getCSSVariableRef(colorName, shadeKeys[4] || shadeKeys[shadeKeys.length - 1]),
    getCSSVariableRef(colorName, shadeKeys[5] || shadeKeys[shadeKeys.length - 1]),
    getCSSVariableRef(colorName, shadeKeys[6] || shadeKeys[shadeKeys.length - 1]),
    getCSSVariableRef(colorName, shadeKeys[7] || shadeKeys[shadeKeys.length - 1]),
    getCSSVariableRef(colorName, shadeKeys[8] || shadeKeys[shadeKeys.length - 1]),
    getCSSVariableRef(colorName, shadeKeys[9] || shadeKeys[shadeKeys.length - 1]),
  ];

  return tuple;
};

export const mantineTheme = createTheme({
  colors: {
    gray: createColorTuple('gray'),
    aqua: createColorTuple('aqua'),
    red: createColorTuple('red'),
    orange: createColorTuple('orange'),
    yellow: createColorTuple('yellow'),
    green: createColorTuple('green'),
    blue: createColorTuple('blue'),
    purple: createColorTuple('purple'),
    grape: createColorTuple('grape'),
  },
  primaryColor: 'aqua',
  primaryShade: 5,
  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});
