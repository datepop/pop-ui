/**
 * Mantine Theme Configuration
 *
 * CSS Variables를 활용한 Mantine 테마 설정
 */

import { createTheme, MantineColorsTuple } from '@mantine/core';
import { colors, getCSSVariableRef } from '@pop-ui/foundation';

const createColorTuple = (colorName: string): MantineColorsTuple => {
  const shades = colors[colorName];
  const shadeKeys = Object.keys(shades).sort((a, b) => Number(a) - Number(b));

  const tuple: string[] = [];
  for (let i = 0; i < 10; i++) {
    const shade = shadeKeys[i];
    if (shade) {
      tuple.push(getCSSVariableRef(colorName, shade));
    } else {
      tuple.push(getCSSVariableRef(colorName, shadeKeys[shadeKeys.length - 1]));
    }
  }

  return tuple as MantineColorsTuple;
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
