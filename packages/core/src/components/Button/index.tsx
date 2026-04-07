'use client';

import { Button as MantineButton, Loader } from '@mantine/core';

import { BUTTON_LOADER_SIZES } from './style';
import styles from './styles.module.scss';

import type { IButtonProps } from './type';
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
  isLoading = false,
  hideLabelOnLoading = false,
  disabled = false,
  className,
  classNames,
  loaderProps,
  ...props
}: IButtonProps) {
  const loaderSize = BUTTON_LOADER_SIZES[size];
  const isButtonLoading = isLoading;
  const isDisabled = disabled || isButtonLoading;

  return (
    <MantineButton
      type="button"
      unstyled
      className={joinClassNames(
        styles.Button,
        disabled ? styles.Button__Disabled : '',
        BUTTON_SIZE_CLASS_NAMES[size],
        BUTTON_VARIANT_CLASS_NAMES[variant],
        className,
      )}
      classNames={mergeClassNamesWithDefault(classNames)}
      {...props}
      disabled={isDisabled}
    >
      {isButtonLoading && <Loader color="currentColor" size={loaderSize} {...loaderProps} />}
      <span className={styles.Button__Label}>
        {isButtonLoading && hideLabelOnLoading ? null : children}
      </span>
    </MantineButton>
  );
}

export default Button;
