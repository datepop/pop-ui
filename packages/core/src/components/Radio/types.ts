import type { TControlSize } from '../shared/controlSize';
import type { RadioProps as MantineRadioProps } from '@mantine/core';

export interface IRadioProps extends MantineRadioProps {
  size?: TControlSize;
}
