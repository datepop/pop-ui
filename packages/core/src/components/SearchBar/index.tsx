'use client';

import { Autocomplete, Input, Tooltip } from '@mantine/core';
import { IconInfoCircle, IconClose, IconSearch } from '@pop-ui/foundation';
import { useCallback, useState } from 'react';

import styles from './styles.module.scss';

import type { AutocompleteProps } from '@mantine/core';

export interface ISearchBarProps extends AutocompleteProps {
  label?: string;
  labelPosition?: 'top' | 'left';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  description?: string;
  errorMsg?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
}

export const SearchBar = ({
  label,
  labelPosition = 'top',
  size = 'md',
  required,
  tooltip,
  tooltipPosition = 'top',
  errorMsg,
  description,
  onChange,
  onClear,
  ...props
}: ISearchBarProps) => {
  const [textCount, setTextCount] = useState<number>(0);

  let labelStyle = styles['SearchBar__Label--Medium'];
  let searchBarStyle = styles['SearchBar--Medium'];
  let tooltipStyle = styles['SearchBar__Tooltip--Medium'];
  if (size === 'sm') {
    labelStyle = styles['SearchBar__Label--Small'];
    searchBarStyle = styles['SearchBar--Small'];
    tooltipStyle = styles['SearchBar__Tooltip--Small'];
  } else if (size === 'lg') {
    labelStyle = styles['SearchBar__Label--Large'];
    searchBarStyle = styles['SearchBar--Large'];
    tooltipStyle = styles['SearchBar__Tooltip--Large'];
  }

  const onChangeHandler = useCallback(
    (value: string) => {
      if (onChange) {
        setTextCount(value?.length);
        onChange(value);
      }
    },
    [onChange],
  );

  return (
    <div
      className={
        labelPosition === 'top' ? styles['SearchBar--TopLabel'] : styles['SearchBar--LeftLabel']
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
        <div className={styles['SearchBar__Wrapper']}>
          <Autocomplete
            {...props}
            size={size}
            error={errorMsg}
            className={searchBarStyle}
            onChange={onChangeHandler}
            leftSection={<IconSearch size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
            rightSection={
              onClear && textCount > 0 ? (
                <div className={styles['SearchBar__ClearButton']} onClick={onClear}>
                  <IconClose size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
                </div>
              ) : undefined
            }
          />
        </div>
        {description && (
          <Input.Description className={styles['SearchBar__Description']}>
            {description}
          </Input.Description>
        )}
        {errorMsg && (
          <Input.Error className={styles['SearchBar__ErrorMsg']}>{errorMsg}</Input.Error>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
