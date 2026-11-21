'use client';

import { Autocomplete, Input } from '@mantine/core';
import { IconX, IconSearch } from '@pop-ui/foundation';
import { useId, useRef, useState } from 'react';

import styles from './styles.module.scss';
import { fieldContentOrderWith } from '../shared/field';
import { FieldLabel } from '../shared/FieldLabel';

import type { ISearchBarProps } from './types';

export const SearchBar = ({
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
  clearable,
  clearButtonProps,
  onClear,
  onChange,
  ...props
}: ISearchBarProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  // clearable 없이 onClear 만 넘긴 기존 호출부는 값을 지우지 않고 onClear 만 호출하는 전용 버튼을 쓴다.
  const [typedValue, setTypedValue] = useState(props.defaultValue ?? '');
  const showLegacyClear =
    !clearable &&
    Boolean(onClear) &&
    !props.disabled &&
    !props.readOnly &&
    Boolean(props.value ?? typedValue);

  let searchBarStyle = styles['SearchBar--Medium'];
  if (size === 'sm') {
    searchBarStyle = styles['SearchBar--Small'];
  } else if (size === 'lg') {
    searchBarStyle = styles['SearchBar--Large'];
  }

  const clearActionProps = {
    icon: <IconX size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />,
    tabIndex: 0,
    'aria-hidden': false,
    'aria-label': '검색어 지우기',
    ...clearButtonProps,
  };

  const handleClear = () => {
    inputRef.current?.focus();
    onClear?.();
  };

  return (
    <div
      className={
        labelPosition === 'top' ? styles['SearchBar--TopLabel'] : styles['SearchBar--LeftLabel']
      }
    >
      <FieldLabel
        htmlFor={inputId}
        label={label}
        required={required}
        size={size}
        tooltip={tooltip}
        tooltipPosition={tooltipPosition}
      />
      <div>
        <div className={styles['SearchBar__Wrapper']}>
          <Autocomplete
            {...props}
            size={size}
            required={required}
            inputWrapperOrder={fieldContentOrderWith(props.inputWrapperOrder, description, error)}
            description={description}
            descriptionProps={{
              className: styles.SearchBar__Description,
              ...props.descriptionProps,
            }}
            errorProps={{
              ...props.errorProps,
              className: [styles.SearchBar__ErrorMsg, props.errorProps?.className]
                .filter(Boolean)
                .join(' '),
            }}
            error={error}
            className={searchBarStyle}
            id={inputId}
            ref={inputRef}
            onChange={(value) => {
              setTypedValue(value);
              onChange?.(value);
            }}
            clearable={clearable}
            rightSection={
              showLegacyClear ? (
                <Input.ClearButton {...clearActionProps} onClick={handleClear} />
              ) : (
                props.rightSection
              )
            }
            rightSectionPointerEvents={showLegacyClear ? 'auto' : props.rightSectionPointerEvents}
            onClear={handleClear}
            clearButtonProps={clearActionProps}
            leftSection={<IconSearch size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
          />
        </div>
      </div>
    </div>
  );
};
