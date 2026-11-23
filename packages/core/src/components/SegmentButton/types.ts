import type { TControlSize } from '../shared/controlSize';
import type { SegmentedControlProps } from '@mantine/core';

export interface ISegmentButtonProps extends SegmentedControlProps {
  size?: TControlSize;
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
