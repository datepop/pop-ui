'use client';

import { DatePicker } from '@mantine/dates';
import { IconChevronLeft, IconChevronRight } from '@pop-ui/foundation';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useMemo, useState } from 'react';

import styles from './styles.module.scss';
import {
  createExcludedDateChecker,
  getEmptyValueForType,
  hasExcludedDateInRange,
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
  ...props
}: ICalendarDatePickerProps) => {
  const [internalValue, setInternalValue] = useState<DateValue | undefined>(
    () => value ?? getEmptyValueForType(type),
  );

  const isExcluded = useMemo(
    () =>
      createExcludedDateChecker({
        excludeWeekdays: excludedDays,
        excludeDates: excludedDates,
      }),
    [excludedDays, excludedDates],
  );

  const handleExcludeDate = (date: Date | string | number) => isExcluded(date);

  const safeOnChange = (newValue: DateValue) => {
    if (onChange) {
      onChange(newValue as unknown as Parameters<typeof onChange>[0]);
    }
  };

  const handleChange = (newValue: DateValue) => {
    if (type === 'range' && Array.isArray(newValue)) {
      const [start, end] = newValue as unknown as [Date | null, Date | null];

      if (start && end && hasExcludedDateInRange(start, end, isExcluded)) {
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
  const renderDay = (date: DateStringValue) => {
    const day = dayjs(date).date();
    const isToday = dayjs(date).isSame(dayjs(), 'day');
    const isTodayDisabled = isToday && isExcluded(date);

    return (
      <div className={styles.dayWrapper}>
        <span>{day}</span>
        {isToday && (
          <span className={isTodayDisabled ? styles.todayLabelDisabled : styles.todayLabel}>
            오늘
          </span>
        )}
      </div>
    );
  };

  const { classNames, ...restProps } = props;

  return (
    <DatePicker
      classNames={{
        levelsGroup: styles.datePickerWrapper,
        calendarHeader: styles.calendarHeader,
        calendarHeaderLevel: styles.calendarHeaderLevel,
        calendarHeaderControl: styles.calendarHeaderControl,
        month: styles.month,
        day: styles.day,
        monthCell: styles.monthCell,
        ...(typeof classNames === 'object' && classNames ? classNames : {}),
      }}
      locale="ko"
      firstDayOfWeek={0}
      monthLabelFormat={'YYYY년 M월'}
      maxLevel="month"
      type={type}
      value={resolvedValue}
      size="xl"
      onChange={handleChange}
      {...restProps}
      excludeDate={handleExcludeDate}
      renderDay={renderDay}
      weekendDays={[0]}
      previousIcon={<IconChevronLeft />}
      nextIcon={<IconChevronRight />}
    />
  );
};

export default CalendarDatePicker;
