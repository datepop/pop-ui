import type { IFieldFeedbackProps, IFieldLabelProps, ILegacyFieldError } from '../shared/field';
import type { SelectProps } from '@mantine/core';

export interface IDropdownProps
  extends Omit<SelectProps, keyof IFieldFeedbackProps | keyof IFieldLabelProps>,
    IFieldFeedbackProps,
    IFieldLabelProps,
    ILegacyFieldError {
  labelPosition?: 'top' | 'left';
}
