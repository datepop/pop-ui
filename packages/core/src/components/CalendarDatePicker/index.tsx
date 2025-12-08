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
import type { DateStringValue, DateValue, DatePickerStylesNames } from '@mantine/dates';

type TMantineClassNames = Partial<Record<DatePickerStylesNames, string>>;

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

  const safeOnChange = (v: DateValue) => {
    onChange?.(v);
  };

  const handleChange = (newValue: DateValue) => {
    // Range 모드에서 제외 날짜 포함된 경우 선택 취소
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

  //TodayIndicator 처리
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

  const mergedClassNames =
    typeof classNames === 'object' && classNames !== null && !Array.isArray(classNames)
      ? mergeClassNames(DEFAULT_CLASS_NAMES, classNames)
      : (classNames ?? DEFAULT_CLASS_NAMES);

  return (
    <DatePicker
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
      highlightToday={highlightToday}
      {...restProps}
      excludeDate={isExcluded}
      renderDay={renderDay}
    />
  );
};

export type { ICalendarDatePickerProps, TDayOfWeek } from './types';
