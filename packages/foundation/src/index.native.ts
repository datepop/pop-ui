export * from './tokens/colors';

// Native components are generated from the web SVG source by scripts/generate-native.ts.
// Keep this entry in sync with that generated API.
export type {
  IIconProps,
  IIconFilledOnlyProps,
  IIconLineOnlyProps,
  IIconLineWeightProps,
} from './types/icon.native';
export type { IIllustrationProps } from './types/illustration.native';
export type { IBrandIconProps } from './types/brand.native';

export * from './icons/native';
export * from './illustrations/native';
export * from './brand/native';
