import type { SelectProps } from '@mantine/core';

export interface IDropdownProps extends SelectProps {
  label?: string;
  labelPosition?: 'top' | 'left';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  description?: string;
  errorMsg?: string;
}
