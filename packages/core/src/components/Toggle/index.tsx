'use client';

import { Switch } from '@mantine/core';
import { useCallback, useState } from 'react';

import styles from './styles.module.scss';

import type { SwitchProps } from '@mantine/core';

export interface IToggleProps extends SwitchProps {
  size?: 'sm' | 'md' | 'lg';
  labelPosition: 'left' | 'right';
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void;
}

export const Toggle = ({
  size = 'md',
  labelPosition = 'right',
  disabled,
  onChange,
  ...props
}: IToggleProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(props?.checked || false);

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      if (onChange) {
        onChange(event);
      }
      setIsChecked(event?.target?.checked);
    },
    [onChange],
  );

  return (
    <Switch
      className={sizeStyle}
      size={size}
      labelPosition={labelPosition}
      disabled={disabled}
      onChange={onChangeHandler}
      styles={() => ({
        track: {
          backgroundColor: !disabled && isChecked ? '#0fd3d8 !important' : undefined,
          borderColor: !disabled && isChecked ? '#0fd3d8 !important' : undefined,
          width: trackWidth,
        },
      })}
      {...props}
    />
  );
};

export default Toggle;
