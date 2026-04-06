'use client';

import { Checkbox as MantineCheckbox } from '@mantine/core';

import styles from './styles.module.scss';

import type { CheckboxProps as MantineCheckboxProps } from '@mantine/core';

const CHECKBOX_CLASS_NAME_BY_SIZE = {
  sm: styles['Checkbox--Small'],
  md: styles['Checkbox--Medium'],
  lg: styles['Checkbox--Large'],
} as const;

const CHECKBOX_DIMENSION_BY_SIZE = {
  sm: 18,
  md: 24,
  lg: 32,
} as const;

export interface ICheckboxProps extends MantineCheckboxProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = ({ size = 'md', ...props }: ICheckboxProps) => {
  const sizeClassName = CHECKBOX_CLASS_NAME_BY_SIZE[size];
  const sizeNumber = CHECKBOX_DIMENSION_BY_SIZE[size];

  return (
    <MantineCheckbox
      className={sizeClassName}
      size={size}
      styles={{
        inner: {
          width: sizeNumber,
          height: sizeNumber,
        },
      }}
      {...props}
    />
  );
};

export default Checkbox;
