import type { AutocompleteProps } from '@mantine/core';

export interface ISearchBarProps extends AutocompleteProps {
  label?: string;
  labelPosition?: 'top' | 'left';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  description?: string;
  errorMsg?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
}
