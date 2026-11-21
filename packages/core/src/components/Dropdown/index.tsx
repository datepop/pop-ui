'use client';

import { Select } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';
import { IconChevronUp, IconChevronDown } from '@pop-ui/foundation';
import { useId, useState } from 'react';

import styles from './styles.module.scss';
import { fieldContentOrderWith } from '../shared/field';
import { FieldLabel } from '../shared/FieldLabel';

import type { IDropdownProps } from './types';

const menuTransition = {
  in: { opacity: 1, transform: 'scale(1)' },
  out: { opacity: 0, transform: 'scale(0.96)' },
  transitionProperty: 'opacity, transform',
};

export const Dropdown = ({
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
  comboboxProps,
  onDropdownOpen,
  onDropdownClose,
  dropdownOpened,
  defaultDropdownOpened,
  classNames,
  onKeyDown,
  ...props
}: IDropdownProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [opened, setOpened] = useState(defaultDropdownOpened ?? false);
  const isOpen = dropdownOpened ?? opened;
  const reduceMotion = useReducedMotion();
  const closeDropdown = () => {
    setOpened(false);
    onDropdownClose?.();
  };

  let selectStyle = styles['Dropdown--Medium'];
  let chevronSize = 18;
  if (size === 'sm') {
    selectStyle = styles['Dropdown--Small'];
    chevronSize = 14;
  } else if (size === 'lg') {
    selectStyle = styles['Dropdown--Large'];
    chevronSize = 24;
  }

  return (
    <div
      className={
        labelPosition === 'top' ? styles['Dropdown--TopLabel'] : styles['Dropdown--LeftLabel']
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
        <Select
          {...props}
          inputWrapperOrder={fieldContentOrderWith(props.inputWrapperOrder, description, error)}
          description={description}
          descriptionProps={{ className: styles.Dropdown__Description, ...props.descriptionProps }}
          errorProps={{
            ...props.errorProps,
            className: [styles.Dropdown__ErrorMsg, props.errorProps?.className]
              .filter(Boolean)
              .join(' '),
          }}
          comboboxProps={{
            // Keep options available for Mantine's keyboard index while the menu animates in.
            keepMounted: true,
            position: 'bottom-start',
            ...comboboxProps,
            transitionProps: {
              transition: menuTransition,
              duration: 150,
              exitDuration: comboboxProps?.transitionProps?.duration ?? 100,
              timingFunction: 'ease-out',
              ...comboboxProps?.transitionProps,
              ...(reduceMotion && { duration: 0, exitDuration: 0 }),
            },
          }}
          id={inputId}
          size={size}
          required={required}
          error={error}
          className={selectStyle}
          rightSection={
            isOpen ? <IconChevronUp size={chevronSize} /> : <IconChevronDown size={chevronSize} />
          }
          dropdownOpened={isOpen}
          onDropdownOpen={() => {
            setOpened(true);
            onDropdownOpen?.();
          }}
          onDropdownClose={closeDropdown}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (
              event.key === 'Tab' &&
              !event.defaultPrevented &&
              isOpen &&
              !props.searchable &&
              !props.autoSelectOnBlur
            ) {
              closeDropdown();
            }
          }}
          classNames={(theme, selectProps, ctx) => {
            const slots =
              typeof classNames === 'function' ? classNames(theme, selectProps, ctx) : classNames;
            return {
              ...slots,
              dropdown: [styles.Dropdown__Menu, slots?.dropdown].filter(Boolean).join(' '),
              option: [styles.Dropdown__Option, slots?.option].filter(Boolean).join(' '),
            };
          }}
        />
      </div>
    </div>
  );
};
