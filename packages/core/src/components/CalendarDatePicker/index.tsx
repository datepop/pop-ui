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

const DEFAULT_CLASS_NAMES: Partial<TMantineClassNames> = {
  levelsGroup: styles.datePickerWrapper,
  calendarHeader: styles.calendarHeader,
  calendarHeaderLevel: styles.calendarHeaderLevel,
  calendarHeaderControl: styles.calendarHeaderControl,
  month: styles.month,
  day: styles.day,
  monthRow: styles.monthRow,
  weekday: styles.weekday,
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
        <>
          {day}
          {shouldShowIndicator && <span className={styles.todayIndicator}>오늘</span>}
        </>
      );
    },
    [highlightToday],
  );

  const { classNames, ...restProps } = props;

  const mergedClassNames = mergeClassNamesWithDefault(DEFAULT_CLASS_NAMES, classNames);

  return (
    <DatePicker
      locale="ko"
      firstDayOfWeek={0}
      monthLabelFormat={'YYYY년 M월'}
      maxLevel="month"
      previousIcon={<IconChevronLeft />}
      nextIcon={<IconChevronRight />}
      {...restProps}
      size="lg"
      onChange={handleChange}
      weekendDays={[0]}
      highlightToday={highlightToday}
      classNames={mergedClassNames}
      value={resolvedValue}
      excludeDate={isExcluded}
      renderDay={renderDay}
    />
  );
};

export type { ICalendarDatePickerProps, TDayOfWeek } from './types';
