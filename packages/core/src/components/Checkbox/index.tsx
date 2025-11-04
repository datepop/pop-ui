'use client';

import { Checkbox as MantineCheckbox } from '@mantine/core';

import styles from './styles.module.scss';

import type { CheckboxProps as MantineCheckboxProps } from '@mantine/core';

export interface CheckboxProps extends MantineCheckboxProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = ({ size = 'md', ...props }: CheckboxProps) => {
  let sizeStyle = styles['Checkbox--Medium'];
  let sizeNumber = 24;
  if (size === 'sm') {
    sizeStyle = styles['Checkbox--Small'];
    sizeNumber = 18;
  } else if (size === 'lg') {
    sizeStyle = styles['Checkbox--Large'];
    sizeNumber = 32;
  }

  return (
    <MantineCheckbox
      className={sizeStyle}
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
