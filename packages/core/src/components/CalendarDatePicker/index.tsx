'use client';

import { DatePicker } from '@mantine/dates';
import { IconChevronLeft, IconChevronRight } from '@pop-ui/foundation';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useCallback, useMemo, useState } from 'react';

import styles from './styles.module.scss';
import {
  createExcludedDateChecker,
  getEmptyValueForType,
  hasExcludedDateInRange,
  mergeClassNamesWithDefault,
  resolveDatePickerValue,
} from './utils';

import type { ICalendarDatePickerProps, TMantineClassNames } from './types';
import type { DateStringValue, DateValue } from '@mantine/dates';
import type { MouseEvent } from 'react';

type TDisplayedDate = Date | DateStringValue;

const getLastInteractedDate = (value: DateValue): DateStringValue | null => {
  if (value == null) {
    return null;
  }

  if (Array.isArray(value)) {
    for (let index = value.length - 1; index >= 0; index -= 1) {
      const candidate = value[index];

      if (candidate instanceof Date) {
        return dayjs(candidate).format('YYYY-MM-DD');
      }
    }

    return null;
  }

  return value instanceof Date ? dayjs(value).format('YYYY-MM-DD') : null;
};

const DEFAULT_CLASS_NAMES: Partial<TMantineClassNames> = {
  levelsGroup: styles.CalendarDatePicker__Wrapper,
  calendarHeader: styles.CalendarDatePicker__Header,
  calendarHeaderLevel: styles.CalendarDatePicker__HeaderLevel,
  calendarHeaderControl: styles.CalendarDatePicker__HeaderControl,
  calendarHeaderControlIcon: styles.CalendarDatePicker__HeaderControlIcon,
  month: styles.CalendarDatePicker__Month,
  monthCell: styles.CalendarDatePicker__MonthCell,
  day: styles.CalendarDatePicker__Day,
  monthRow: styles.CalendarDatePicker__MonthRow,
  weekdaysRow: styles.CalendarDatePicker__WeekdaysRow,
  weekday: styles.CalendarDatePicker__Weekday,
};

/**
 * CalendarDatePicker
 *
 * Mantine DatePicker 기반의 인라인 캘린더 컴포넌트
 * 특정 날짜/요일 제외 기능 및 제외된 날짜 포함 선택 시 선택 취소 지원
 *
 * @see README.md for detailed documentation
 */
export const CalendarDatePicker = ({
  excludedDates = [],
  excludedDays = [],
  type = 'default',
  value,
  onChange,
  highlightToday = false,
  ...props
}: ICalendarDatePickerProps) => {
  const { classNames, date, defaultDate, onDateChange, getDayProps, ...restProps } = props;

  const [internalValue, setInternalValue] = useState<DateValue | undefined>(
    () => value ?? getEmptyValueForType(type),
  );
  const [internalDate, setInternalDate] = useState<TDisplayedDate | undefined>(() => {
    if (date) {
      return date;
    }

    if (defaultDate) {
      return defaultDate;
    }

    const initialValueDate = getLastInteractedDate(value ?? getEmptyValueForType(type));

    return initialValueDate ?? new Date();
  });

  const isExcluded = useMemo(
    () =>
      createExcludedDateChecker({
        excludedDays,
        excludedDates,
      }),
    [excludedDays, excludedDates],
  );

  const handleDisplayedDateChange = useCallback(
    (nextDate: DateStringValue) => {
      if (date === undefined) {
        setInternalDate(nextDate);
      }

      onDateChange?.(nextDate);
    },
    [date, onDateChange],
  );

  const handleChange = (newValue: DateValue) => {
    // Range 모드에서 제외 날짜 포함된 경우 선택 취소
    if (type === 'range' && Array.isArray(newValue) && newValue.length === 2) {
      const [start, end] = newValue as unknown as [Date | null, Date | null];

      if (start && end && hasExcludedDateInRange(start, end, excludedDates, excludedDays)) {
        const emptyValue = getEmptyValueForType('range');
        setInternalValue(emptyValue);
        onChange?.(emptyValue);
        return;
      }
    }

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const resolvedValue = resolveDatePickerValue({
    type,
    externalValue: value,
    internalValue,
  });

  // TodayIndicator 처리
  const renderDay = useCallback(
    (date: DateStringValue) => {
      const day = dayjs(date).date();
      const isToday = dayjs(date).isSame(dayjs(), 'day');
      const shouldShowIndicator = isToday && highlightToday;
      return (
        <span className={styles.CalendarDatePicker__DayContent}>
          <span className={styles.CalendarDatePicker__DayLabel}>{day}</span>
          {shouldShowIndicator && (
            <span className={styles.CalendarDatePicker__TodayIndicator}>오늘</span>
          )}
        </span>
      );
    },
    [highlightToday],
  );

  const mergedClassNames = mergeClassNamesWithDefault(DEFAULT_CLASS_NAMES, classNames);
  const displayedDate = date ?? internalDate;
  const currentMonthKey = dayjs(displayedDate ?? new Date()).format('YYYY-MM');

  const resolvedDayProps = useCallback(
    (targetDate: DateStringValue) => {
      const userDayProps = getDayProps?.(targetDate) ?? {};
      const isOutsideDisplayedMonth = dayjs(targetDate).format('YYYY-MM') !== currentMonthKey;

      return {
        ...userDayProps,
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
          userDayProps.onClick?.(event);

          if (isOutsideDisplayedMonth) {
            handleDisplayedDateChange(targetDate);
          }
        },
      };
    },
    [currentMonthKey, getDayProps, handleDisplayedDateChange],
  );

  return (
    <DatePicker
      locale="ko"
      firstDayOfWeek={0}
      monthLabelFormat={'YYYY년 M월'}
      maxLevel="month"
      type={type}
      previousIcon={<IconChevronLeft />}
      nextIcon={<IconChevronRight />}
      {...restProps}
      size="lg"
      onChange={handleChange}
      weekendDays={[0]}
      highlightToday={highlightToday}
      classNames={mergedClassNames}
      defaultDate={date === undefined ? defaultDate : undefined}
      date={displayedDate}
      onDateChange={handleDisplayedDateChange}
      getDayProps={resolvedDayProps}
      value={resolvedValue}
      excludeDate={isExcluded}
      renderDay={renderDay}
    />
  );
};

export type { ICalendarDatePickerProps, TDayOfWeek } from './types';
