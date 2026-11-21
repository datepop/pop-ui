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

/** 호출부가 정한 순서를 유지하고, 전달된 설명·오류 문구가 순서에서 빠졌으면 뒤에 붙인다. */
export function fieldContentOrderWith(
  order: InputWrapperProps['inputWrapperOrder'],
  description: ReactNode,
  error: ReactNode,
): NonNullable<InputWrapperProps['inputWrapperOrder']> {
  if (!order) return fieldContentOrder;
  // error={true} 는 문구 없이 오류 상태만 표시하므로 순서에 추가하지 않는다.
  const passed = { description, error: error === true ? null : error };
  const missing = (['description', 'error'] as const).filter(
    (part) => passed[part] && !order.includes(part),
  );
  return [...order, ...missing];
}
