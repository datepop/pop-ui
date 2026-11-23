import type { IFieldFeedbackProps, IFieldLabelProps, ILegacyFieldError } from '../shared/field';
import type { InputProps, TextareaProps } from '@mantine/core';
import type { ChangeEvent } from 'react';

export interface ICommonTextFieldProps
  extends IFieldFeedbackProps,
    IFieldLabelProps,
    ILegacyFieldError {
  labelPosition?: 'top' | 'left';
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
