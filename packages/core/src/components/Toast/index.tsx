'use client';

import { notifications } from '@mantine/notifications';

import styles from './styles.module.scss';

import type { IToastOptions, TToastInput } from './type';

/**
 * 토스트 알림을 표시합니다
 * @param input - 문자열 메시지 또는 옵션 객체
 * @example
 * // 간단한 사용
 * toast('작업이 완료되었습니다');
 *
 * // 옵션과 함께 사용
 * toast({
 *   message: '작업이 완료되었습니다',
 *   icon: <IconCheck />,
 *   autoClose: 5000,
 * });
 */
export const toast = (input: TToastInput): void => {
  const options: IToastOptions = typeof input === 'string' ? { message: input } : input;

  const { message, icon, autoClose } = options;

  notifications.show({
    message: <div className={styles.Toast__Message}>{message}</div>,
    icon,
    autoClose,
    classNames: {
      root: styles.Toast,
      body: styles.Toast__Body,
      icon: styles.Toast__Icon,
    },
    withCloseButton: false,
    withBorder: false,
  });
};

export default toast;
