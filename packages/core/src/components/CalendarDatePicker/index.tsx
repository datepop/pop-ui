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
  mergeClassNames,
  resolveDatePickerValue,
} from './utils';

import type { ICalendarDatePickerProps } from './types';
import type { DateStringValue, DateValue } from '@mantine/dates';

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
  showTodayIndicator = false,
  ...props
}: ICalendarDatePickerProps) => {
  const [internalValue, setInternalValue] = useState<DateValue | undefined>(
    () => value ?? getEmptyValueForType(type),
  );

  const isExcluded = useMemo(
    () =>
      createExcludedDateChecker({
        excludedDays,
        excludedDates,
      }),
    [excludedDays, excludedDates],
  );

  const safeOnChange = (newValue: DateValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleChange = (newValue: DateValue) => {
    if (type === 'range' && Array.isArray(newValue)) {
      const [start, end] = newValue as unknown as [Date | null, Date | null];

      if (start && end && hasExcludedDateInRange(start, end, excludedDates, excludedDays)) {
        const emptyRange: [Date | null, Date | null] = [null, null];
        setInternalValue(emptyRange as unknown as DateValue);
        safeOnChange(emptyRange as unknown as DateValue);
        return;
      }
    }

    setInternalValue(newValue);
    safeOnChange(newValue);
  };

  const resolvedValue = resolveDatePickerValue({
    type,
    externalValue: value,
    internalValue,
  });
  const renderDay = useCallback(
    (date: DateStringValue) => {
      const current = dayjs(date);
      const day = current.date();

      const isToday = current.isSame(dayjs(), 'day');
      const isExcludedToday = isToday && isExcluded(date);

      const shouldShowIndicator = isToday && showTodayIndicator;

      return (
        <div className={styles.dayWrapper}>
          <span>{day}</span>

          {shouldShowIndicator && (
            <span className={styles.todayIndicator} data-disabled={isExcludedToday || undefined}>
              오늘
            </span>
          )}
        </div>
      );
    },
    [isExcluded, showTodayIndicator],
  );

  const { classNames, className, ...restProps } = props;

  // Merge default classNames with user-provided classNames
  const defaultClassNames = {
    levelsGroup: styles.datePickerWrapper,
    calendarHeader: styles.calendarHeader,
    calendarHeaderLevel: styles.calendarHeaderLevel,
    calendarHeaderControl: styles.calendarHeaderControl,
    month: styles.month,
    day: styles.day,
    monthCell: styles.monthCell,
  };

  // classNames가 객체인 경우에만 병합, 함수인 경우 그대로 전달
  const mergedClassNames =
    typeof classNames === 'object' && classNames !== null && !Array.isArray(classNames)
      ? mergeClassNames(defaultClassNames, classNames)
      : (classNames ?? defaultClassNames);

  // Merge className (single string) with default className
  const defaultClassName = showTodayIndicator ? undefined : styles.withoutTodayIndicator;
  const mergedClassName =
    [defaultClassName, className].filter(Boolean).join(' ').trim() || undefined;

  return (
    <DatePicker
      className={mergedClassName}
      classNames={mergedClassNames}
      locale="ko"
      firstDayOfWeek={0}
      monthLabelFormat={'YYYY년 M월'}
      maxLevel="month"
      type={type}
      value={resolvedValue}
      size="lg"
      onChange={handleChange}
      previousIcon={<IconChevronLeft />}
      nextIcon={<IconChevronRight />}
      weekendDays={[0]}
      {...restProps}
      excludeDate={isExcluded}
      renderDay={renderDay}
    />
  );
};

// Export types for external use
export type { ICalendarDatePickerProps, TDayOfWeek } from './types';
