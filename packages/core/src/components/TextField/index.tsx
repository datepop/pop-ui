'use client';

import { Input, Textarea, Tooltip } from '@mantine/core';
import { IconInfoCircle, IconX } from '@pop-ui/foundation';
import { useCallback, useState } from 'react';

import styles from './styles.module.scss';

import type { InputProps, TextareaProps } from '@mantine/core';

interface ICommonTextFieldProps {
  label?: string;
  labelPosition?: 'top' | 'left';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  description?: string;
  errorMsg?: string;
  maxTextCount?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClear?: () => void;
}

export type TTextFieldProps = ICommonTextFieldProps &
  (
    | ({ textarea?: false } & Omit<InputProps, keyof ICommonTextFieldProps | 'vars'>)
    | ({ textarea: true; minRows?: number } & Omit<
        TextareaProps,
        keyof ICommonTextFieldProps | 'vars'
      >)
  );

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
    label,
    labelPosition = 'top',
    size = 'md',
    required,
    tooltip,
    tooltipPosition = 'top',
    errorMsg,
    description,
    textarea = false,
    maxTextCount,
    onChange,
    onClear,
    ...otherProps
  } = allProps;

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

  let labelStyle = styles['TextField__Label--Medium'];
  let textfieldStyle = styles['TextField--Medium'];
  let tooltipStyle = styles['TextField__Tooltip--Medium'];
  if (size === 'sm') {
    labelStyle = styles['TextField__Label--Small'];
    textfieldStyle = styles['TextField--Small'];
    tooltipStyle = styles['TextField__Tooltip--Small'];
  } else if (size === 'lg') {
    labelStyle = styles['TextField__Label--Large'];
    textfieldStyle = styles['TextField--Large'];
    tooltipStyle = styles['TextField__Tooltip--Large'];
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
      <div>
        {label && (
          <Input.Label required={required} className={labelStyle}>
            {label}
          </Input.Label>
        )}
        {tooltip && (
          <Tooltip label={tooltip} position={tooltipPosition}>
            <div className={tooltipStyle}>
              <IconInfoCircle size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
            </div>
          </Tooltip>
        )}
      </div>
      <div>
        <div className={styles['TextField__Wrapper']}>
          {textarea ? (
            <Textarea
              className={styles['TextField--Textarea']}
              size={size}
              minRows={minRows}
              error={errorMsg}
              onChange={onChangeHandler}
              value={currentValue}
              {...(restProps as Omit<TextareaProps, keyof ICommonTextFieldProps | 'vars'>)}
            />
          ) : (
            <Input
              className={textfieldStyle}
              error={errorMsg}
              onChange={onChangeHandler}
              value={currentValue}
              rightSection={
                onClear && textCount > 0 ? (
                  <button
                    type="button"
                    className={styles['TextField__ClearButton']}
                    aria-label="입력 내용 지우기"
                    onClick={handleClear}
                  >
                    <IconX size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
                  </button>
                ) : undefined
              }
              {...(restProps as Omit<InputProps, keyof ICommonTextFieldProps | 'vars'>)}
            />
          )}
          {maxTextCount && maxTextCount > 0 && (
            <span
              className={styles['TextField__TextCounter']}
            >{`${textCount}/${maxTextCount}`}</span>
          )}
        </div>
        {description && (
          <Input.Description className={styles['TextField__Description']}>
            {description}
          </Input.Description>
        )}
        {errorMsg && (
          <Input.Error className={styles['TextField__ErrorMsg']}>{errorMsg}</Input.Error>
        )}
      </div>
    </div>
  );
};

export default TextField;
