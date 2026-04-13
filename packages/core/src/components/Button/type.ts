import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import type { MouseEventHandler } from 'react';

export type TButtonSize = 'sm' | 'md' | 'lg';
export type TButtonVariant =
  | 'primary'
  | 'primaryLine'
  | 'basic'
  | 'danger'
  | 'setting'
  | 'warning'
  | 'ghost';

export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const satisfies readonly TButtonSize[];
export const BUTTON_VARIANTS = [
  'primary',
  'primaryLine',
  'basic',
  'danger',
  'setting',
  'warning',
  'ghost',
] as const satisfies readonly TButtonVariant[];

export interface IButtonProps extends Omit<MantineButtonProps, 'variant' | 'styles'> {
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: TButtonSize;
  variant?: TButtonVariant;
  isLoading?: boolean;
  hideLabelOnLoading?: boolean;
}
