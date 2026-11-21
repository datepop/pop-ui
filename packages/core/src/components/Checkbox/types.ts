import type { TControlSize } from '../shared/controlSize';
import type { CheckboxProps as MantineCheckboxProps } from '@mantine/core';

export interface ICheckboxProps extends MantineCheckboxProps {
  size?: TControlSize;
}
