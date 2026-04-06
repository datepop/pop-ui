import type { ButtonProps as MantineButtonProps } from '@mantine/core';

export type TButtonSize = 'sm' | 'md' | 'lg';
export type TButtonVariant = 'primary' | 'primaryLine' | 'basic' | 'danger' | 'setting' | 'warning';

export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const satisfies readonly TButtonSize[];
export const BUTTON_VARIANTS = [
  'primary',
  'primaryLine',
  'basic',
  'danger',
  'setting',
  'warning',
] as const satisfies readonly TButtonVariant[];

export interface IButtonProps extends Omit<MantineButtonProps, 'variant' | 'styles'> {
  onClick?: () => void;
  size?: TButtonSize;
  variant?: TButtonVariant;
  isLoading?: boolean;
}
