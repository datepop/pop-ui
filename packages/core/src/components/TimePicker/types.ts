import type { TControlSize } from '../shared/controlSize';
import type { TimeInputProps } from '@mantine/dates';

export interface ITimePickerProps extends TimeInputProps {
  size?: TControlSize;
}
