'use client';

import { Radio as MantineRadio } from '@mantine/core';

import styles from './styles.module.scss';

import type { RadioProps as MantineRadioProps } from '@mantine/core';

export interface IRadioProps extends MantineRadioProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Radio = ({ size = 'md', ...props }: IRadioProps) => {
  let sizeStyle = styles['Radio--Medium'];
  if (size === 'sm') {
    sizeStyle = styles['Radio--Small'];
  } else if (size === 'lg') {
    sizeStyle = styles['Radio--Large'];
  }

  return <MantineRadio className={sizeStyle} size={size} {...props} />;
};

export default Radio;
