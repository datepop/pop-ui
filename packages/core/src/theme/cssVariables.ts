/**
 * CSS Variables Generator
 *
 * 디자인 토큰을 CSS Custom Properties로 변환
 * Light/Dark 테마 모두 동일한 색상 사용
 */

import { colors, getCSSVariableName } from './colors/tokens';

export type ThemeMode = 'light' | 'dark';

export const generateCSSVariables = (theme: ThemeMode = 'light'): string => {
  const cssVars: string[] = [];

  Object.entries(colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      const varName = getCSSVariableName(colorName, shade);
      cssVars.push(`${varName}: ${value};`);
    });
  });

  return cssVars.join('\n  ');
};

export const injectCSSVariables = (theme: ThemeMode = 'light'): void => {
  const existingStyle = document.getElementById('pop-ui-theme-vars');
  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement('style');
  style.id = 'pop-ui-theme-vars';
  style.textContent = `
:root {
  ${generateCSSVariables('light')}
}

[data-theme="dark"] {
  ${generateCSSVariables('dark')}
}
`;
  document.head.appendChild(style);
};

export const getCSSVariableValue = (
  colorName: string,
  shade: string
): string => {
  return `var(${getCSSVariableName(colorName, shade)})`;
};
