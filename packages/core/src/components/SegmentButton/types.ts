import type { SegmentedControlProps } from '@mantine/core';

export interface ISegmentButtonProps extends SegmentedControlProps {
  size?: 'sm' | 'md' | 'lg';
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
