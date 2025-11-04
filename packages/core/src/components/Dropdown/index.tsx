'use client';

import { Input, Select, Tooltip } from '@mantine/core';
import { IconInfoCircle, IconChevronUp, IconChevronDown } from '@pop-ui/foundation';
import { useState } from 'react';

import styles from './styles.module.scss';

import type { SelectProps, CSSProperties } from '@mantine/core';

export interface SearchBarProps extends SelectProps {
  label?: string;
  labelPosition?: 'top' | 'left';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  description?: string;
  errorMsg?: string;
}

export const Dropdown = ({
  label,
  labelPosition = 'top',
  size = 'md',
  required,
  tooltip,
  tooltipPosition = 'top',
  errorMsg,
  description,
  ...props
}: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let labelStyle = styles['Dropdown__Label--Medium'];
  let selectStyle = styles['Dropdown--Medium'];
  let tooltipStyle = styles['Dropdown__Tooltip--Medium'];
  let chevronSize = 18;
  if (size === 'sm') {
    labelStyle = styles['Dropdown__Label--Small'];
    selectStyle = styles['Dropdown--Small'];
    tooltipStyle = styles['Dropdown__Tooltip--Small'];
    chevronSize = 14;
  } else if (size === 'lg') {
    labelStyle = styles['Dropdown__Label--Large'];
    selectStyle = styles['Dropdown--Large'];
    tooltipStyle = styles['Dropdown__Tooltip--Large'];
    chevronSize = 24;
  }

  return (
    <div
      className={
        labelPosition === 'top' ? styles['Dropdown--TopLabel'] : styles['Dropdown--LeftLabel']
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
        <Select
          {...props}
          size={size}
          error={errorMsg}
          className={selectStyle}
          rightSection={
            isOpen ? <IconChevronUp size={chevronSize} /> : <IconChevronDown size={chevronSize} />
          }
          onDropdownOpen={() => setIsOpen(true)}
          onDropdownClose={() => setIsOpen(false)}
          styles={{
            option: {
              '&[data-selected]': {
                '&, &:hover': {
                  backgroundColor: '#e7e7e7',
                  color: '#000000',
                } as CSSProperties,
              } as CSSProperties,
            } as CSSProperties,
          }}
        />
        {description && (
          <Input.Description className={styles['Dropdown__Description']}>
            {description}
          </Input.Description>
        )}
        {errorMsg && <Input.Error className={styles['Dropdown__ErrorMsg']}>{errorMsg}</Input.Error>}
      </div>
    </div>
  );
};

export default Dropdown;
