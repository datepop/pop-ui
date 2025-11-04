'use client';

import { ActionIcon } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@pop-ui/foundation';
import { useRef } from 'react';

import styles from './styles.module.scss';

import type { TimeInputProps } from '@mantine/dates';

export interface ITimePickerProps extends TimeInputProps {
  size?: 'sm' | 'md' | 'lg';
}

export const TimePicker = ({ size = 'md', ...props }: ITimePickerProps) => {
  const timeInputRef = useRef<HTMLInputElement>(null);

  let sizeStyle = styles['TimePicker--Medium'];
  let iconSize = 18;
  if (size === 'sm') {
    sizeStyle = styles['TimePicker--Small'];
    iconSize = 14;
  } else if (size === 'lg') {
    sizeStyle = styles['TimePicker--Large'];
    iconSize = 24;
  }

  return (
    <TimeInput
      ref={timeInputRef}
      className={sizeStyle}
      size={size}
      {...props}
      rightSection={
        <ActionIcon
          onClick={() => {
            if (timeInputRef) {
              timeInputRef?.current?.showPicker();
            }
          }}
        >
          <IconClock size={iconSize} />
        </ActionIcon>
      }
    />
  );
};

export default TimePicker;
