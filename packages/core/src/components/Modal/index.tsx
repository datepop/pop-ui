'use client';

import { Modal as MantineModal } from '@mantine/core';
import { ColorGray600, ColorGray900, IconX } from '@pop-ui/foundation';

import type { ModalProps as MantineModalProps } from '@mantine/core';

export interface IModalProps extends MantineModalProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: number;
}

export const Modal = ({ size = 'md', width, withCloseButton = false, ...props }: IModalProps) => {
  let sizeNumber = 768;
  if (size === 'xs') {
    sizeNumber = 360;
  } else if (size === 'sm') {
    sizeNumber = 544;
  } else if (size === 'lg') {
    sizeNumber = 1000;
  } else if (size === 'xl') {
    sizeNumber = 1200;
  }

  return (
    <MantineModal
      size={width || sizeNumber}
      styles={{
        content: {
          borderRadius: '12px',
        },
        title: {
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '150%',
          color: ColorGray900,
        },
        header: {
          padding: '16px',
        },
        body: {
          paddingLeft: '0px',
          paddingRight: '0px',
        },
      }}
      withCloseButton={withCloseButton}
      closeButtonProps={{
        icon: <IconX size={18} color={ColorGray600} />,
      }}
      {...props}
    />
  );
};

export default Modal;
