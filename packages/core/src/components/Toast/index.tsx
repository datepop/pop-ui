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
 *
 * // id를 사용한 중복 방지 및 업데이트
 * toast({
 *   id: 'save-toast',
 *   message: '저장 중...',
 * });
 *
 * // 같은 id로 다시 호출하면 기존 토스트가 업데이트됩니다
 * toast({
 *   id: 'save-toast',
 *   message: '저장 완료!',
 * });
 */
export const toast = (input: TToastInput): void => {
  const options: IToastOptions = typeof input === 'string' ? { message: input } : input;

  const { message, id, icon, autoClose } = options;

  notifications.show({
    id,
    message: (
      <div className={styles.Toast__Message}>
        {message}
      </div>
    ),
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

/**
 * 기존 토스트를 업데이트합니다
 * @param id - 업데이트할 토스트의 id
 * @param input - 문자열 메시지 또는 옵션 객체
 * @example
 * toast.update('save-toast', '저장 완료!');
 *
 * toast.update('save-toast', {
 *   message: '저장 완료!',
 *   icon: <IconCheck />,
 * });
 *
 */
toast.update = (id: string, input: TToastInput): void => {
  const options: IToastOptions = typeof input === 'string' ? { message: input } : input;

  const { message, icon, autoClose } = options;

  notifications.update({
    id,
    message: (
      <div className={styles.Toast__Message}>
        {message}
      </div>
    ),
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

/**
 * 특정 id의 토스트를 닫습니다
 * @param id - 닫을 토스트의 id
 * @example
 * toast.hide('save-toast');
 */
toast.hide = (id: string): void => {
  notifications.hide(id);
};

/**
 * 모든 토스트를 제거합니다
 * @example
 * toast.clean();
 */
toast.clean = (): void => {
  notifications.clean();
};

export default toast;
