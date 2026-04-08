'use client';

import 'dayjs/locale/ko';
import { Input, Popover } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconCalendar, formatDateDisplay, toValueString, parseDateValue } from '@pop-ui/foundation';
import dayjs from 'dayjs';
import { useState } from 'react';

import { CalendarDatePicker } from '../CalendarDatePicker';
import styles from './styles.module.scss';
import {
  getEmptyValueForType,
  mergeClassNamesWithDefault,
  resolveDatePickerValue,
} from '../CalendarDatePicker/utils';

import type {
  TMantineClassNameRecord,
  TMantineClassNamesResolver,
  TDayOfWeek,
} from '../CalendarDatePicker/types';
import type { PopoverProps, PopoverStylesNames } from '@mantine/core';
import type { DateTimePickerProps, DateTimePickerStylesNames, DateValue } from '@mantine/dates';
import type { TDateDisplayType } from '@pop-ui/foundation';

const DEFAULT_DATE_TIME_CLASS_NAMES = {
  wrapper: styles.DatePicker__Wrapper,
  input: styles.DatePicker__Input,
  section: styles.DatePicker__Section,
  placeholder: styles.DatePicker__Placeholder,
  datePickerRoot: styles.DatePicker__Root,
  levelsGroup: styles.DatePicker__LevelsGroup,
  calendarHeader: styles.DatePicker__CalendarHeader,
  calendarHeaderLevel: styles.DatePicker__CalendarHeaderLevel,
  calendarHeaderControl: styles.DatePicker__CalendarHeaderControl,
  calendarHeaderControlIcon: styles.DatePicker__CalendarHeaderControlIcon,
  month: styles.DatePicker__Month,
  weekdaysRow: styles.DatePicker__WeekdaysRow,
  weekday: styles.DatePicker__Weekday,
  monthRow: styles.DatePicker__MonthRow,
  monthCell: styles.DatePicker__MonthCell,
  day: styles.DatePicker__Day,
  timeWrapper: styles.DatePicker__TimeWrapper,
  timeInput: styles.DatePicker__TimeInput,
  submitButton: styles.DatePicker__SubmitButton,
} as Partial<Record<DateTimePickerStylesNames, string>>;

const DEFAULT_POPOVER_CLASS_NAMES = {
  dropdown: styles.DatePicker__Dropdown,
  arrow: styles.DatePicker__DropdownArrow,
};

type TDatePickerPopoverClassNames = TMantineClassNameRecord<PopoverStylesNames>;
type TDatePickerPopoverClassNamesResolver = TMantineClassNamesResolver<
  PopoverStylesNames,
  PopoverProps
>;

const joinClassNames = (...values: Array<string | undefined>) =>
  values.filter(Boolean).join(' ') || undefined;

/** Mantine의 DateValue(= Date | null)는 multiple/range 런타임 값을 표현하지 못하므로 내부 전용 타입 정의 */
type TInternalDateValue = Date | null | Date[] | [Date | null, Date | null];

/**
 * Mantine 8에서 DateValue는 string(DateStringValue) 또는 Date 객체로 올 수 있음.
 * 내부 처리를 위해 항상 Date 객체로 변환.
 * Mantine의 DateStringValue 포맷: 'YYYY-MM-DD'
 */
const toDateOrNull = (v: DateValue | null | undefined): Date | null => {
  if (v === null || v === undefined) return null;
  if (v instanceof Date) return v;
  if (typeof v === 'string' && v) {
    // 'YYYY-MM-DD' → local Date (timezone shift 방지)
    const parts = v.split('-').map(Number);
    if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
  }
  return null;
};

export interface IDatePickerProps {
  size?: 'sm' | 'md' | 'lg';
  type?: TDateDisplayType;
  withTime?: boolean;
  // 값 제어
  value?: string | null | string[] | [string | null, string | null];
  defaultValue?: string | null | string[] | [string | null, string | null];
  onChange?: (value: string | null | string[] | [string | null, string | null]) => void;
  // Input 외관
  placeholder?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  clearable?: boolean;
  // 날짜 제약
  minDate?: Date;
  maxDate?: Date;
  displayValueFormat?: string; // 입력창 표시 형식. 기본: 'YYYY년 MM월 DD일'
  valueFormat?: string; // onChange emit 형식. 기본: 'YYYY-MM-DD'
  // CalendarDatePicker 전용
  excludedDates?: (string | [string, string])[];
  excludedDays?: TDayOfWeek[];
  highlightToday?: boolean;
  // 스타일
  className?: string;
  popoverProps?: PopoverProps;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number;
}

export const DatePicker = ({
  size = 'md',
  type = 'default',
  withTime,
  className,
  popoverProps,
  rightSection,
  rightSectionWidth,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  minDate,
  maxDate,
  displayValueFormat = 'YYYY년 MM월 DD일',
  valueFormat,
  excludedDates,
  excludedDays,
  highlightToday,
}: IDatePickerProps) => {
  const resolvedValueFormat = valueFormat ?? (withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD');

  const [opened, setOpened] = useState(false);
  const [internalValue, setInternalValue] = useState<TInternalDateValue>(
    () =>
      parseDateValue(value ?? defaultValue, type, resolvedValueFormat) ??
      (getEmptyValueForType(type) as TInternalDateValue),
  );

  let sizeStyle = styles['DatePicker--Medium'];
  let iconSize = 18;
  let calendarSectionWidth = 42;

  if (size === 'sm') {
    sizeStyle = styles['DatePicker--Small'];
    iconSize = 14;
    calendarSectionWidth = 34;
  } else if (size === 'lg') {
    sizeStyle = styles['DatePicker--Large'];
    iconSize = 24;
    calendarSectionWidth = 50;
  }

  const mergedPopoverClassNames = mergeClassNamesWithDefault<PopoverStylesNames, PopoverProps>(
    DEFAULT_POPOVER_CLASS_NAMES,
    popoverProps?.classNames as TDatePickerPopoverClassNames | TDatePickerPopoverClassNamesResolver,
  );

  const calendarIcon = rightSection ?? (
    <span aria-hidden="true" className={styles.DatePicker__Icon}>
      <IconCalendar size={iconSize} />
    </span>
  );

  if (withTime) {
    // public value/defaultValue는 string — Mantine DateTimePicker는 Date를 요구하므로 변환
    const isControlled = value !== undefined;
    const dateTimeValue =
      typeof value === 'string' && value ? dayjs(value, resolvedValueFormat).toDate() : null;
    const dateTimeDefaultValue =
      typeof defaultValue === 'string' && defaultValue
        ? dayjs(defaultValue, resolvedValueFormat).toDate()
        : null;

    return (
      <DateTimePicker
        className={joinClassNames(
          styles.DatePickerBase,
          styles.DatePickerRoot,
          sizeStyle,
          className,
        )}
        classNames={mergeClassNamesWithDefault<DateTimePickerStylesNames, DateTimePickerProps>(
          DEFAULT_DATE_TIME_CLASS_NAMES,
          undefined,
        )}
        size={size}
        locale="ko"
        firstDayOfWeek={0}
        monthLabelFormat={'YYYY년 MM월'}
        valueFormat="YYYY-MM-DD | a hh:mm"
        rightSection={calendarIcon}
        rightSectionWidth={rightSectionWidth ?? calendarSectionWidth}
        popoverProps={{
          offset: 8,
          position: 'bottom-start',
          withArrow: true,
          arrowSize: 10,
          arrowOffset: 20,
          ...popoverProps,
          classNames: mergedPopoverClassNames,
        }}
        value={isControlled ? dateTimeValue : undefined}
        defaultValue={isControlled ? undefined : dateTimeDefaultValue}
        onChange={(next) => {
          // Mantine 8은 Date 또는 DateStringValue를 emit — 공개 API 형식(string | null)으로 변환
          onChange?.(next ? dayjs(next).format(resolvedValueFormat) : null);
        }}
        placeholder={placeholder}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }

  const parsedExternalValue =
    value != null ? (parseDateValue(value, type, resolvedValueFormat) as DateValue) : undefined;
  const resolvedValue = resolveDatePickerValue({
    type,
    externalValue: parsedExternalValue,
    internalValue: internalValue as DateValue,
  });
  const displayText = formatDateDisplay(
    resolvedValue as TInternalDateValue,
    type,
    displayValueFormat,
  );

  const handleCalendarChange = (newValue: DateValue) => {
    // Mantine 8은 DateStringValue(string)를 emit할 수 있으므로 Date로 정규화
    let typedNewValue: TInternalDateValue;
    if (type === 'range' && Array.isArray(newValue)) {
      const arr = newValue as unknown as (DateValue | null)[];
      typedNewValue = [toDateOrNull(arr[0] ?? null), toDateOrNull(arr[1] ?? null)];
    } else if (type === 'multiple' && Array.isArray(newValue)) {
      typedNewValue = (newValue as DateValue[])
        .map((v) => toDateOrNull(v))
        .filter((d): d is Date => d !== null);
    } else {
      typedNewValue = toDateOrNull(newValue as DateValue);
    }

    setInternalValue(typedNewValue);
    onChange?.(toValueString(typedNewValue, type, resolvedValueFormat));
    if (type === 'default' && typedNewValue != null) {
      setOpened(false);
    }
    if (type === 'range' && Array.isArray(typedNewValue) && typedNewValue[0] && typedNewValue[1]) {
      setOpened(false);
    }
  };

  return (
    <div
      className={joinClassNames(styles.DatePickerBase, styles.DatePickerRoot, sizeStyle, className)}
    >
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        offset={8}
        position="bottom-start"
        withArrow
        arrowSize={10}
        arrowOffset={20}
        {...popoverProps}
        classNames={mergedPopoverClassNames}
      >
        <Popover.Target>
          <div
            className={styles.DatePicker__Wrapper}
            data-expanded={opened ? true : undefined}
            data-disabled={disabled ? true : undefined}
          >
            <Input
              component="button"
              type="button"
              classNames={{
                input: styles.DatePicker__Input,
                section: styles.DatePicker__Section,
              }}
              onClick={() => !disabled && setOpened((o) => !o)}
              disabled={disabled}
              rightSection={calendarIcon}
              rightSectionWidth={rightSectionWidth ?? calendarSectionWidth}
              data-expanded={opened ? true : undefined}
              data-disabled={disabled ? true : undefined}
            >
              {displayText ? (
                <span>{displayText}</span>
              ) : (
                <span className={styles.DatePicker__Placeholder}>{placeholder}</span>
              )}
            </Input>
          </div>
        </Popover.Target>

        <Popover.Dropdown>
          <CalendarDatePicker
            type={type}
            value={resolvedValue}
            onChange={handleCalendarChange}
            excludedDates={excludedDates}
            excludedDays={excludedDays}
            highlightToday={highlightToday}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default DatePicker;
