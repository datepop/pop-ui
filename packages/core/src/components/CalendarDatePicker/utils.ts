import dayjs from 'dayjs';

import type { TCalendarDatePickerType, TExcludeCheckerOptions } from './types';
import type { DateValue } from '@mantine/dates';

/**
 * 날짜 제외 체크 함수 생성
 *
 * @see README.md - Architecture 섹션 참고
 */
export const createExcludedDateChecker = ({
  excludedDays = [],
  excludedDates = [],
}: TExcludeCheckerOptions) => {
  // excludeDates를 단일 날짜와 범위로 분리
  const singleDates: string[] = [];
  const dateRanges: [string, string][] = [];

  for (const item of excludedDates) {
    if (typeof item === 'string') {
      singleDates.push(item);
    } else {
      dateRanges.push(item);
    }
  }

  // 단일 날짜를 'YYYY-MM-DD' 포맷으로 정규화
  const parsedExcludeDates = singleDates.map((d) => dayjs(d).format('YYYY-MM-DD')).filter(Boolean);

  // 범위의 start/end 를 dayjs 객체로 미리 파싱
  const parsedRanges = dateRanges
    .map(([s, e]) => [dayjs(s), dayjs(e)] as const)
    .filter(([s, e]) => s.isValid() && e.isValid());

  return (dateInput: Date | string | number) => {
    const d = dayjs(dateInput);

    if (!d.isValid()) return false;

    // 1) 특정 요일 제외
    if (Array.isArray(excludedDays) && excludedDays.includes(d.day())) {
      return true;
    }

    // 2) 특정 단일 날짜 제외
    if (parsedExcludeDates.includes(d.format('YYYY-MM-DD'))) {
      return true;
    }

    // 3) 특정 기간 제외 (start <= date <= end)
    for (const [start, end] of parsedRanges) {
      if (
        (d.isSame(start, 'day') || d.isAfter(start, 'day')) &&
        (d.isSame(end, 'day') || d.isBefore(end, 'day'))
      ) {
        return true;
      }
    }

    return false;
  };
};

/**
 * 날짜 범위 내에 제외된 날짜가 있는지 확인
 *
 * @param start - 시작 날짜
 * @param end - 종료 날짜
 * @param isExcludedChecker - 날짜 제외 체크 함수
 * @returns 범위 내에 제외된 날짜가 있으면 true
 *
 * @example
 * const isExcluded = createExcludedDateChecker({ excludeDates: ['2025-11-27'] });
 * hasExcludedDateInRange(new Date('2025-11-26'), new Date('2025-11-28'), isExcluded);
 * // => true (11/27이 제외되어 있음)
 */
export const hasExcludedDateInRange = (
  start: Date,
  end: Date,
  isExcludedChecker: (date: Date) => boolean,
): boolean => {
  let current = dayjs(start);
  const endDay = dayjs(end);

  while (current.isBefore(endDay, 'day') || current.isSame(endDay, 'day')) {
    if (isExcludedChecker(current.toDate())) {
      return true;
    }
    current = current.add(1, 'day');
  }

  return false;
};

/**
 * 타입에 따른 빈 값 반환
 */
export const getEmptyValueForType = (type: TCalendarDatePickerType = 'default'): DateValue => {
  switch (type) {
    case 'range':
      return [null, null] as unknown as DateValue;
    case 'multiple':
      return [] as unknown as DateValue;
    default:
      return null;
  }
};

/**
 * 타입에 맞게 값 정규화
 */
export const normalizeValueForType = (
  type: TCalendarDatePickerType = 'default',
  value: DateValue | undefined,
): DateValue => {
  if (value == null) {
    return getEmptyValueForType(type);
  }

  if (type === 'range') {
    return Array.isArray(value) ? value : getEmptyValueForType('range');
  }

  if (type === 'multiple') {
    return Array.isArray(value) ? value : getEmptyValueForType('multiple');
  }

  return Array.isArray(value) ? (value[0] ?? null) : value;
};

/**
 * 외부/내부 값을 타입에 맞게 해석하여 반환
 */
export const resolveDatePickerValue = ({
  type,
  externalValue,
  internalValue,
}: {
  type: TCalendarDatePickerType;
  externalValue: DateValue | undefined;
  internalValue: DateValue | undefined;
}): DateValue => {
  if (externalValue !== undefined) {
    return normalizeValueForType(type, externalValue);
  }

  if (internalValue !== undefined) {
    return normalizeValueForType(type, internalValue);
  }

  return getEmptyValueForType(type);
};
