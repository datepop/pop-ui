import { CONTROL_SIZES } from '../shared/controlSize';

import type { TControlSize } from '../shared/controlSize';
import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import type { ButtonHTMLAttributes, MouseEventHandler } from 'react';

export type TButtonSize = TControlSize;
export type TButtonVariant =
  | 'primary'
  | 'primaryLine'
  | 'basic'
  | 'danger'
  | 'setting'
  | 'warning'
  | 'ghost';

export const BUTTON_SIZES = CONTROL_SIZES;
export const BUTTON_VARIANTS = [
  'primary',
  'primaryLine',
  'basic',
  'danger',
  'setting',
  'warning',
  'ghost',
] as const satisfies readonly TButtonVariant[];

export interface IButtonProps
  extends Omit<MantineButtonProps, 'variant' | 'styles'>,
    Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'onFocus' | 'onBlur' | 'onClickCapture' | 'onKeyDown' | 'aria-disabled'
    > {
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: TButtonSize;
  variant?: TButtonVariant;
  isLoading?: boolean;
  hideLabelOnLoading?: boolean;
}
