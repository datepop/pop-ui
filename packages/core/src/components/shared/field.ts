import type { TControlSize } from './controlSize';
import type { InputWrapperProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface IFieldLabelProps {
  label?: string;
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export interface IFieldFeedbackProps {
  size?: TControlSize;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

export interface ILegacyFieldError<TMessage extends ReactNode = string> {
  /** @deprecated Use error. */
  errorMsg?: TMessage;
}

export type TMultiItemInputFeedback = Pick<IFieldFeedbackProps, 'error'> &
  ILegacyFieldError<ReactNode>;

export const fieldContentOrder: NonNullable<InputWrapperProps['inputWrapperOrder']> = [
  'label',
  'input',
  'description',
  'error',
];
