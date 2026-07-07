import type { ModalProps as MantineModalProps } from '@mantine/core';

export interface IModalProps extends MantineModalProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: number;
}
