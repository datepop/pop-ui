'use client';

import { Button as MantineButton, Loader } from '@mantine/core';
import { useState } from 'react';

import { BUTTON_LOADER_SIZES } from './style';
import styles from './styles.module.scss';
import { mergeClassNamesWithDefault } from '../shared/classNames';

import type { IButtonProps } from './types';
import type {
  ButtonProps as MantineButtonProps,
  ButtonStylesNames,
} from '@mantine/core';

type TButtonClassNameRecord = Partial<Record<ButtonStylesNames, string>>;
const DEFAULT_CLASS_NAMES = {
  inner: styles.Button__Inner,
  label: styles.Button__Label,
  section: styles.Button__Section,
  loader: styles.Button__Loader,
} satisfies TButtonClassNameRecord;

const BUTTON_SIZE_CLASS_NAMES = {
  sm: styles['Button--Small'],
  md: styles['Button--Medium'],
  lg: styles['Button--Large'],
} as const;

const BUTTON_VARIANT_CLASS_NAMES = {
  primary: styles['Button--Primary'],
  primaryLine: styles['Button--PrimaryLine'],
  basic: styles['Button--Basic'],
  danger: styles['Button--Danger'],
  setting: styles['Button--Setting'],
  warning: styles['Button--Warning'],
  ghost: styles['Button--Ghost'],
} as const;

const joinClassNames = (...values: Array<string | undefined>) =>
  values.filter(Boolean).join(' ') || undefined;

export function Button({
  children,
  size = 'md',
  variant = 'primary',
  type = 'button',
  isLoading = false,
  loading = false,
  hideLabelOnLoading = true,
  disabled = false,
  onFocus,
  onBlur,
  onClickCapture,
  onKeyDown,
  className,
  classNames,
  loaderProps,
  ...props
}: IButtonProps) {
  const loaderSize = BUTTON_LOADER_SIZES[size];
  // Mantine `loading`도 로딩 트리거로 받되, unstyled 모드에서 깨지는 Mantine 로더로 전달되지 않도록
  // 구조분해로 가로채 자체 Loader만 렌더한다.
  const isButtonLoading = isLoading || loading;
  const [focused, setFocused] = useState(false);
  // A native disabled button loses focus. Keep an already-focused button in place during loading.
  const isDisabled = disabled || (isButtonLoading && !focused);

  return (
    <MantineButton
      type={type}
      unstyled
      className={joinClassNames(
        styles.Button,
        disabled ? styles.Button__Disabled : '',
        BUTTON_SIZE_CLASS_NAMES[size],
        BUTTON_VARIANT_CLASS_NAMES[variant],
        className,
      )}
      classNames={mergeClassNamesWithDefault<ButtonStylesNames, MantineButtonProps>(
        DEFAULT_CLASS_NAMES,
        classNames,
      )}
      disabled={isDisabled}
      aria-busy={isButtonLoading || undefined}
      data-loading-overlay={(isButtonLoading && hideLabelOnLoading) || undefined}
      {...props}
      aria-disabled={isButtonLoading || props['aria-disabled']}
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlur?.(event);
      }}
      onKeyDown={(event) => {
        if (isButtonLoading && (event.key === ' ' || event.key === 'Enter')) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onKeyDown?.(event);
      }}
      onClickCapture={(event) => {
        if (isButtonLoading) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClickCapture?.(event);
      }}
    >
      {isButtonLoading && (
        <span className={styles.Button__Loader} aria-hidden>
          <Loader color="currentColor" size={loaderSize} {...loaderProps} />
        </span>
      )}
      <span className={styles.Button__Content}>{children}</span>
    </MantineButton>
  );
}
