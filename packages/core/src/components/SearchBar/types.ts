import type { IFieldFeedbackProps, IFieldLabelProps, ILegacyFieldError } from '../shared/field';
import type { AutocompleteProps } from '@mantine/core';

export interface ISearchBarProps
  extends Omit<AutocompleteProps, keyof IFieldFeedbackProps | keyof IFieldLabelProps>,
    IFieldFeedbackProps,
    IFieldLabelProps,
    ILegacyFieldError {
  labelPosition?: 'top' | 'left';
  onChange?: (value: string) => void;
  onClear?: () => void;
}
