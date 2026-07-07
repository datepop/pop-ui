'use client';

import { SegmentedControl } from '@mantine/core';
import { BorderRadius150 } from '@pop-ui/foundation';

import styles from './styles.module.scss';

import type { SegmentedControlProps } from '@mantine/core';

export interface ISegmentButtonProps extends SegmentedControlProps {
  size?: 'sm' | 'md' | 'lg';
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const SegmentButton = ({
  size = 'md',
  radius = BorderRadius150,
  ...props
}: ISegmentButtonProps) => {
  let sizeStyle = styles['SegmentButton--Medium'];
  if (size === 'sm') {
    sizeStyle = styles['SegmentButton--Small'];
  } else if (size === 'lg') {
    sizeStyle = styles['SegmentButton--Large'];
  }

  return (
    <SegmentedControl
      className={sizeStyle}
      size={size}
      radius={radius}
      withItemsBorders={false}
      {...props}
    />
  );
};
