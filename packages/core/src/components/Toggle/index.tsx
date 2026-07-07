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
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
          backgroundColor: !disabled && isChecked ? `${ColorAqua500} !important` : undefined,
          borderColor: !disabled && isChecked ? `${ColorAqua500} !important` : undefined,
          width: trackWidth,
        },
      })}
      {...props}
    />
  );
};
