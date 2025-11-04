import { rgba } from 'polished';

// Simple CSS style type for documentation purposes
type TCSSStyleString = string;

export const background = {
  app: '#F6F9FC',
  appInverse: '#7A8997',
  positive: '#E1FFD4',
  negative: '#FEDED2',
  warning: '#FFF5CF',
  calmBlue: '#E3F3FF',
};

export const color = {
  aqua: '#0FD3D8',
  secondary: '#029CFD',
  tertiary: '#E3E6E8',

  orange: '#FC521F',
  gold: '#FFAE00',
  green: '#66BF3C',
  seafoam: '#37D5D3',
  purple: '#6F2CAC',
  ultraviolet: '#2A0481',
  red: '#ff4400',

  bluelight: '#E3F3FF',
  bluelighter: '#F5FBFF',

  lightest: '#FFFFFF',
  lighter: '#F7FAFC',
  light: '#EEF3F6',
  mediumlight: '#ECF4F9',
  medium: '#D9E8F2',
  mediumdark: '#73828C',
  dark: '#5C6870',
  darker: '#454E54',
  darkest: '#2E3438',
  tr10: 'rgba(0, 0, 0, 0.1)',
  tr5: 'rgba(0, 0, 0, 0.05)',

  border: 'hsla(203, 50%, 30%, 0.15)',

  positive: '#448028',
  negative: '#D43900',
  warning: '#A15C20',
  selected: '#0271B6',
};

export const spacing = {
  padding: {
    small: 10,
    medium: 20,
    large: 30,
  },
  borderRadius: {
    small: 5,
    default: 10,
  },
};

export const typography = {
  type: {
    primary: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    code: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  weight: {
    regular: '400',
    bold: '700',
    extrabold: '800',
  },
  size: {
    s1: 12,
    s2: 14,
    s3: 16,
    m1: 20,
    m2: 24,
    m3: 28,
    l1: 32,
    l2: 40,
    l3: 48,
    code: 90,
  },
} as const;

export const breakpoint = 600;
export const pageMargin = 5.55555;

export const pageMargins: TCSSStyleString = `
  padding: 0 ${spacing.padding.medium}px;
  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 1}%;
  }
  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 2}%;
  }
  @media (min-width: ${breakpoint * 3}px) {
    margin: 0 ${pageMargin * 3}%;
  }
  @media (min-width: ${breakpoint * 4}px) {
    margin: 0 ${pageMargin * 4}%;
  }
`;

export const hoverEffect: TCSSStyleString = `
  border: 1px solid ${color.border};
  border-radius: ${spacing.borderRadius.small}px;
  transition:
    background 150ms ease-out,
    border 150ms ease-out,
    transform 150ms ease-out;

  &:hover,
  &.__hover {
    border-color: ${rgba(color.secondary, 0.5)};
    transform: translate3d(0, -3px, 0);
    box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
  }

  &:active,
  &.__active {
    border-color: ${rgba(color.secondary, 1)};
    transform: translate3d(0, 0, 0);
  }
`;

export const zIndex = {
  tooltip: 2147483647,
};

export const headers: Record<string, TCSSStyleString> = {
  hero1: `font-size: ${typography.size.l3}px; font-weight: ${typography.weight.bold};`,
  hero2: `font-size: ${typography.size.l2}px; font-weight: ${typography.weight.bold};`,
  h1: `font-size: ${typography.size.l1}px; font-weight: ${typography.weight.bold};`,
  h2: `font-size: ${typography.size.m3}px; font-weight: ${typography.weight.bold};`,
  h3: `font-size: ${typography.size.m2}px; font-weight: ${typography.weight.bold};`,
  h4: `font-size: ${typography.size.m1}px; font-weight: ${typography.weight.bold};`,
  h5: `font-size: ${typography.size.s3}px; font-weight: ${typography.weight.bold};`,
  h6: `font-size: ${typography.size.s2}px; font-weight: ${typography.weight.bold};`,
};

export const subheading: Record<string, TCSSStyleString> = {
  regular: `font-size: 13px; font-weight: ${typography.weight.extrabold}; line-height: 18px; letter-spacing: 0.38em;`,
  small: `font-size: 11px; font-weight: ${typography.weight.extrabold}; line-height: 16px; letter-spacing: 0.38em;`,
};

export const text: Record<string, TCSSStyleString> = {
  storybookMediumBold: `font-size: 13px; font-weight: ${typography.weight.bold}; line-height: 18px;`,
  storybookMedium: `font-size: 13px; font-weight: ${typography.weight.regular}; line-height: 18px;`,
  largeBold: `font-size: ${typography.size.s3}px; font-weight: ${typography.weight.bold}; line-height: 24px;`,
  small: `font-size: ${typography.size.s1}px; font-weight: ${typography.weight.regular}; line-height: 18px;`,
  regularBold: `font-size: ${typography.size.s2}px; font-weight: ${typography.weight.bold}; line-height: 20px;`,
  smallBold: `font-size: ${typography.size.s1}px; font-weight: ${typography.weight.bold}; line-height: 18px;`,
  large: `font-size: ${typography.size.s3}px; font-weight: ${typography.weight.regular}; line-height: 24px;`,
  regular: `font-size: ${typography.size.s2}px; font-weight: ${typography.weight.regular}; line-height: 20px;`,
};

export const code: Record<string, TCSSStyleString> = {
  regular: `font-family: ${typography.type.code}; font-size: ${typography.size.s2}px; font-weight: ${typography.weight.regular}; line-height: 17px;`,
  small: `font-family: ${typography.type.code}; font-size: ${typography.size.s1}px; font-weight: ${typography.weight.regular}; line-height: 14px;`,
};
