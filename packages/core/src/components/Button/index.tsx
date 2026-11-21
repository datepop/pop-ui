'use client';

import { Button as MantineButton, Loader } from '@mantine/core';
import { useState } from 'react';

import { BUTTON_LOADER_SIZES } from './style';
import styles from './styles.module.scss';

import type { IButtonProps } from './types';
import type {
  ButtonProps as MantineButtonProps,
  ButtonStylesNames,
  MantineTheme,
} from '@mantine/core';

type TButtonClassNameRecord = Partial<Record<ButtonStylesNames, string>>;
type TButtonClassNamesResolver =
  | TButtonClassNameRecord
  | ((theme: MantineTheme, props: MantineButtonProps, ctx: unknown) => TButtonClassNameRecord)
  | null;

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

const mergeClassNamesWithDefault = (
  classNames?: TButtonClassNamesResolver,
):
  | TButtonClassNameRecord
  | ((theme: MantineTheme, props: MantineButtonProps, ctx: unknown) => TButtonClassNameRecord) => {
  const mergeObjects = (
    defaults: TButtonClassNameRecord,
    custom: TButtonClassNameRecord,
  ): TButtonClassNameRecord => {
    const merged: TButtonClassNameRecord = Object.keys(defaults).reduce((acc, key) => {
      const typedKey = key as ButtonStylesNames;
      const mergedClassName = [defaults[typedKey], custom[typedKey]].filter(Boolean).join(' ');

      if (mergedClassName) {
        acc[typedKey] = mergedClassName;
      }

      return acc;
    }, {} as TButtonClassNameRecord);

    Object.keys(custom).forEach((key) => {
      const typedKey = key as ButtonStylesNames;

      if (!(typedKey in defaults) && custom[typedKey]) {
        merged[typedKey] = custom[typedKey];
      }
    });

    return merged;
  };

  if (typeof classNames === 'function') {
    return (theme: MantineTheme, props: MantineButtonProps, ctx: unknown) =>
      mergeObjects(DEFAULT_CLASS_NAMES, classNames(theme, props, ctx));
  }

  if (typeof classNames === 'object' && classNames !== null && !Array.isArray(classNames)) {
    return mergeObjects(DEFAULT_CLASS_NAMES, classNames);
  }

  return DEFAULT_CLASS_NAMES;
};

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
      classNames={mergeClassNamesWithDefault(classNames)}
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
