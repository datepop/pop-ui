'use client';

import { Autocomplete } from '@mantine/core';
import { IconX, IconSearch } from '@pop-ui/foundation';
import { useId, useRef } from 'react';

import styles from './styles.module.scss';
import { fieldContentOrder } from '../shared/field';
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
  ...props
}: ISearchBarProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

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
            inputWrapperOrder={props.inputWrapperOrder ?? fieldContentOrder}
            description={description}
            descriptionProps={{
              className: styles.SearchBar__Description,
              ...props.descriptionProps,
            }}
            errorProps={{ className: styles.SearchBar__ErrorMsg, ...props.errorProps }}
            error={error}
            className={searchBarStyle}
            id={inputId}
            ref={inputRef}
            clearable={clearable || Boolean(onClear)}
            onClear={() => {
              inputRef.current?.focus();
              onClear?.();
            }}
            clearButtonProps={clearActionProps}
            leftSection={<IconSearch size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
          />
        </div>
      </div>
    </div>
  );
};
