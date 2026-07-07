import type { InputProps, TextareaProps } from '@mantine/core';
import type { ChangeEvent } from 'react';

export interface ICommonTextFieldProps {
  label?: string;
  labelPosition?: 'top' | 'left';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  description?: string;
  errorMsg?: string;
  maxTextCount?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClear?: () => void;
}

export type TTextFieldProps = ICommonTextFieldProps &
  (
    | ({ textarea?: false } & Omit<InputProps, keyof ICommonTextFieldProps | 'vars'>)
    | ({ textarea: true; minRows?: number } & Omit<
        TextareaProps,
        keyof ICommonTextFieldProps | 'vars'
      >)
  );
