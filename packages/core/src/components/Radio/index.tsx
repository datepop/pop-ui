'use client';

import { Radio as MantineRadio } from '@mantine/core';

import styles from './styles.module.scss';

import type { RadioProps as MantineRadioProps } from '@mantine/core';

const RADIO_CLASS_NAME_BY_SIZE = {
  sm: styles['Radio--Small'],
  md: styles['Radio--Medium'],
  lg: styles['Radio--Large'],
} as const;

export interface IRadioProps extends MantineRadioProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Radio = ({ size = 'md', ...props }: IRadioProps) => {
  const sizeClassName = RADIO_CLASS_NAME_BY_SIZE[size];

  return <MantineRadio className={sizeClassName} size={size} {...props} />;
};

export default Radio;
