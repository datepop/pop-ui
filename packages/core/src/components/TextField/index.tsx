'use client';

import { Input, Textarea } from '@mantine/core';
import { IconX } from '@pop-ui/foundation';
import { useCallback, useId, useRef, useState } from 'react';

import styles from './styles.module.scss';
import { FieldLabel } from '../shared/FieldLabel';

import type { ICommonTextFieldProps, TTextFieldProps } from './types';
import type { InputProps, TextareaProps } from '@mantine/core';

const getTextLength = (value: unknown): number => {
  if (typeof value === 'string') {
    return value.length;
  }

  if (typeof value === 'number') {
    return String(value).length;
  }

  if (Array.isArray(value)) {
    return value.join('').length;
  }

  return 0;
};

export const TextField = (allProps: TTextFieldProps) => {
  const {
    id,
    label,
    labelPosition = 'top',
    size = 'md',
    required,
    tooltip,
    tooltipPosition,
    errorMsg,
    error = errorMsg,
    description,
    textarea = false,
    maxTextCount,
    onChange,
    onClear,
    ...otherProps
  } = allProps;
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const minRows = 'minRows' in allProps ? allProps.minRows : undefined;
  const {
    value: valueProp,
    defaultValue: defaultValueProp,
    ...restProps
  } = otherProps as {
    value?: string;
    defaultValue?: string;
    [key: string]: unknown;
  };
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    String(valueProp ?? defaultValueProp ?? ''),
  );
  const currentValue = isControlled ? valueProp : uncontrolledValue;
  const textCount = getTextLength(currentValue);
  const showCounter = maxTextCount !== undefined && maxTextCount > 0;
  const showClear = Boolean(onClear && textCount && !restProps.disabled && !restProps.readOnly);
  const { descriptionProps, errorProps } = allProps.textarea ? allProps : {};
  const descriptionId = description
    ? (descriptionProps?.id ?? `${fieldId}-description`)
    : undefined;
  const hasErrorMessage = Boolean(error) && typeof error !== 'boolean';
  const errorId = hasErrorMessage ? (errorProps?.id ?? `${fieldId}-error`) : undefined;

  let textfieldStyle = styles['TextField--Medium'];
  if (size === 'sm') {
    textfieldStyle = styles['TextField--Small'];
  } else if (size === 'lg') {
    textfieldStyle = styles['TextField--Large'];
  }

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value;

      if (maxTextCount && nextValue.length > maxTextCount) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      if (onChange) {
        onChange(event);
      }
    },
    [isControlled, maxTextCount, onChange],
  );

  const handleClear = useCallback(() => {
    inputRef.current?.focus();
    if (!isControlled) {
      setUncontrolledValue('');
    }
    onClear?.();
  }, [isControlled, onClear]);

  return (
    <div
      className={
        labelPosition === 'top' ? styles['TextField--TopLabel'] : styles['TextField--LeftLabel']
      }
    >
      <FieldLabel
        htmlFor={fieldId}
        label={label}
        required={required}
        size={size}
        tooltip={tooltip}
        tooltipPosition={tooltipPosition}
      />
      <Input.Wrapper
        id={fieldId}
        description={description}
        error={error}
        inputWrapperOrder={['input']}
      >
        {textarea ? (
          <Textarea
            id={fieldId}
            aria-required={required}
            className={styles['TextField--Textarea']}
            size={size}
            minRows={minRows}
            description={description}
            error={error}
            onChange={onChangeHandler}
            value={currentValue}
            {...(restProps as Omit<TextareaProps, keyof ICommonTextFieldProps | 'vars'>)}
            inputWrapperOrder={['input']}
          />
        ) : (
          <Input
            id={fieldId}
            ref={inputRef}
            aria-required={required}
            rightSectionPointerEvents={showClear ? 'auto' : undefined}
            className={textfieldStyle}
            error={error}
            onChange={onChangeHandler}
            value={currentValue}
            rightSection={
              showClear ? (
                <button
                  type="button"
                  className={styles['TextField__ClearButton']}
                  aria-label="입력 내용 지우기"
                  onClick={handleClear}
                >
                  <IconX size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
                </button>
              ) : undefined
            }
            {...(restProps as Omit<InputProps, keyof ICommonTextFieldProps | 'vars'>)}
          />
        )}
        {(description || hasErrorMessage || showCounter) && (
          <div className={showCounter ? styles.TextField__Footer : undefined}>
            {description && (
              <Input.Description
                {...descriptionProps}
                id={descriptionId}
                className={[styles.TextField__Description, descriptionProps?.className]
                  .filter(Boolean)
                  .join(' ')}
              >
                {description}
              </Input.Description>
            )}
            {hasErrorMessage && (
              <Input.Error
                {...errorProps}
                id={errorId}
                className={[styles.TextField__ErrorMsg, errorProps?.className]
                  .filter(Boolean)
                  .join(' ')}
              >
                {error}
              </Input.Error>
            )}
            {showCounter && (
              <span className={styles.TextField__TextCounter}>
                {textCount}/{maxTextCount}
              </span>
            )}
          </div>
        )}
      </Input.Wrapper>
    </div>
  );
};
