'use client';

import { Switch } from '@mantine/core';
import { ColorAqua500 } from '@pop-ui/foundation';
import { useCallback, useState } from 'react';

import styles from './styles.module.scss';

import type { IToggleProps } from './types';

export const Toggle = ({
  size = 'md',
  labelPosition = 'right',
  disabled,
  checked,
  defaultChecked,
  onChange,
  ...props
}: IToggleProps) => {
  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean>(defaultChecked ?? false);
  const isChecked = isControlled ? checked : uncontrolledChecked;

  let sizeStyle = styles['Toggle--Medium'];
  let trackWidth = 50;
  if (size === 'sm') {
    sizeStyle = styles['Toggle--Small'];
    trackWidth = 38;
  } else if (size === 'lg') {
    sizeStyle = styles['Toggle--Large'];
    trackWidth = 67;
  }

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
      if (!isControlled) {
        setUncontrolledChecked(event?.target?.checked);
      }
    },
    [isControlled, onChange],
  );

  return (
    <Switch
      className={sizeStyle}
      size={size}
      labelPosition={labelPosition}
      disabled={disabled}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChangeHandler}
      styles={() => ({
        track: {
          backgroundColor: !disabled && isChecked ? `${ColorAqua500} !important` : undefined,
          borderColor: !disabled && isChecked ? `${ColorAqua500} !important` : undefined,
          width: trackWidth,
        },
      })}
      {...props}
    />
  );
};
