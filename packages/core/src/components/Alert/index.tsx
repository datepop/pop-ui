'use client';

import { Alert as MantineAlert } from '@mantine/core';
import { IconCheckCircle, IconWarningCircle } from '@pop-ui/foundation';

import styles from './styles.module.scss';

import type { AlertProps as MatineAlertProps } from '@mantine/core';

export interface IAlertProps extends MatineAlertProps {
  visible: boolean;
  type?: 'success' | 'error';
  variant?: 'fill' | 'light';
  title?: string;
}

export const Alert = ({
  visible = false,
  type = 'success',
  variant = 'light',
  top = 48,
  right = 48,
  ...props
}: IAlertProps) => {
  let typeStyle = styles['Alert--LightSuccess'];
  if (variant === 'fill') {
    if (type === 'success') {
      typeStyle = styles['Alert--FillSuccess'];
    } else if (type === 'error') {
      typeStyle = styles['Alert--FillError'];
    }
  } else {
    if (type === 'success') {
      typeStyle = styles['Alert--LightSuccess'];
    } else if (type === 'error') {
      typeStyle = styles['Alert--LightError'];
    }
  }

  return visible ? (
    <MantineAlert
      className={typeStyle}
      icon={type === 'success' ? <IconCheckCircle size={20} /> : <IconWarningCircle size={20} />}
      styles={{
        title: {
          marginBottom: !props?.children ? 0 : undefined,
        },
      }}
      pos="fixed"
      top={top}
      right={right}
      {...props}
    />
  ) : null;
};

export default Alert;
