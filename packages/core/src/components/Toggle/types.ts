import type { SwitchProps } from '@mantine/core';
import type { ChangeEvent } from 'react';

export interface IToggleProps extends SwitchProps {
  size?: 'sm' | 'md' | 'lg';
  labelPosition: 'left' | 'right';
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
