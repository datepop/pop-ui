import dayjs from 'dayjs';

import type { TCalendarDatePickerType, TExcludeCheckerOptions } from './types';
import type { DateValue, DatePickerStylesNames } from '@mantine/dates';

/**
 * 날짜 제외 체크 함수 생성
 *
 * @param excludedDays - 제외할 요일 배열 (0=일요일 ~ 6=토요일)
 * @param excludedDates - 제외할 날짜 배열 (단일 날짜 또는 범위)
 * @returns 날짜가 제외되었는지 확인하는 함수
 *
 * @example
 * const isExcluded = createExcludedDateChecker({
 *   excludedDays: [0, 6],
 *   excludedDates: ['2025-12-25', ['2025-12-24', '2025-12-26']]
 * });
 * isExcluded(new Date('2025-12-25')); // => true
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
  const parsedExcludeDates = singleDates
    .map((d) => dayjs(d))
    .filter((d) => d.isValid())
    .map((d) => d.format('YYYY-MM-DD'));
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
 * 범위 겹침 알고리즘을 사용하여 O(n) 대신 O(m) 복잡도로 최적화합니다.
 *
 * @param start - 시작 날짜
 * @param end - 종료 날짜
 * @param excludedDates - 제외할 날짜 배열 (단일 날짜 또는 범위)
 * @param excludedDays - 제외할 요일 배열 (0=일요일 ~ 6=토요일)
 * @returns 범위 내에 제외된 날짜가 있으면 true
 *
 * @example
 * hasExcludedDateInRange(
 *   new Date('2025-11-26'),
 *   new Date('2025-11-28'),
 *   ['2025-11-27'],
 *   []
 * ); // => true
 */
export const hasExcludedDateInRange = (
  start: Date,
  end: Date,
  excludedDates: (string | [string, string])[],
  excludedDays: number[],
): boolean => {
  const startDay = dayjs(start);
  const endDay = dayjs(end);

  // 1. 제외된 범위와 겹침 검사 (범위 겹침 알고리즘)
  for (const item of excludedDates) {
    if (Array.isArray(item)) {
      const exStart = dayjs(item[0]);
      const exEnd = dayjs(item[1]);

      if (!exStart.isValid() || !exEnd.isValid()) continue;

      // 범위가 겹치지 않는 경우: end < exStart || start > exEnd
      // 따라서 겹치는 경우: !(end < exStart || start > exEnd)
      if (!(endDay.isBefore(exStart, 'day') || startDay.isAfter(exEnd, 'day'))) {
        return true; // 범위 겹침 발견!
      }
    }
  }

  // 2. 단일 제외 날짜 검사
  for (const item of excludedDates) {
    if (typeof item === 'string') {
      const excludedDate = dayjs(item);
      if (!excludedDate.isValid()) continue;

      // 제외 날짜가 범위 내에 있는지 확인
      if (
        (excludedDate.isSame(startDay, 'day') || excludedDate.isAfter(startDay, 'day')) &&
        (excludedDate.isSame(endDay, 'day') || excludedDate.isBefore(endDay, 'day'))
      ) {
        return true;
      }
    }
  }

  // 3. 제외된 요일 검사 (범위 내에 해당 요일이 있는지)
  if (excludedDays.length > 0) {
    let current = startDay;
    while (current.isBefore(endDay, 'day') || current.isSame(endDay, 'day')) {
      if (excludedDays.includes(current.day())) {
        return true;
      }
      current = current.add(1, 'day');
    }
  }

  return false;
};

/**
 * 타입에 따른 빈 값 반환
 *
 * @param type - CalendarDatePicker의 타입
 * @returns 타입에 맞는 초기 빈 값
 *
 * @example
 * getEmptyValueForType('default');  // => null
 * getEmptyValueForType('multiple'); // => []
 * getEmptyValueForType('range');    // => [null, null]
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
 *
 * @param type - CalendarDatePicker의 타입
 * @param value - 정규화할 DateValue
 * @returns 타입에 맞게 정규화된 DateValue
 *
 * @example
 * normalizeValueForType('range', someDate);     // => [null, null]
 * normalizeValueForType('range', [date1, date2]); // => [date1, date2]
 * normalizeValueForType('default', [date1]);      // => date1
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
 *
 * Controlled/Uncontrolled 모드를 지원합니다.
 *
 * @param type - CalendarDatePicker의 타입
 * @param externalValue - 외부에서 전달된 value prop (controlled)
 * @param internalValue - 내부 상태 값 (uncontrolled)
 * @returns 타입에 맞게 정규화된 최종 DateValue
 *
 * @example
 * resolveDatePickerValue({ type: 'default', externalValue: date1, internalValue: date2 }); // => date1
 * resolveDatePickerValue({ type: 'default', externalValue: undefined, internalValue: date2 }); // => date2
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

type TMantineClassNames = Partial<Record<DatePickerStylesNames, string>>;

/**
 * CSS 클래스명 병합 함수
 *
 * 기본 classNames와 커스텀 classNames를 병합하여 반환합니다.
 * 각 키에 대해 기본 클래스와 커스텀 클래스를 공백으로 연결하므로,
 * 두 스타일이 모두 적용되며 커스텀 클래스가 우선순위를 가집니다.
 * customClassNames에 defaultClassNames에 없는 키가 있어도 결과에 포함됩니다.
 * DatePickerStylesNames에 속하는 키만 허용됩니다.
 *
 * @param defaultClassNames - 기본 클래스명 객체
 * @param customClassNames - 사용자 제공 커스텀 클래스명 객체 (optional)
 * @returns 병합된 클래스명 객체
 *
 * @example
 * const merged = mergeClassNames(
 *   { day: 'default-day', header: 'default-header' },
 *   { day: 'custom-day', calendarHeaderLevel: 'custom-level' }
 * );
 * // => { day: 'default-day custom-day', header: 'default-header', calendarHeaderLevel: 'custom-level' }
 */
export const mergeClassNames = (
  defaultClassNames: TMantineClassNames,
  customClassNames?: TMantineClassNames | null,
): TMantineClassNames => {
  if (!customClassNames || typeof customClassNames !== 'object') {
    return defaultClassNames;
  }

  // 1. defaultClassNames의 모든 키를 순회하여 병합
  const merged: TMantineClassNames = Object.keys(defaultClassNames).reduce((acc, key) => {
    const typedKey = key as DatePickerStylesNames;
    const defaultClass = defaultClassNames[typedKey];
    const customClass = customClassNames[typedKey];

    if (defaultClass) {
      acc[typedKey] = customClass ? `${defaultClass} ${customClass}`.trim() : defaultClass;
    }

    return acc;
  }, {} as TMantineClassNames);

  // 2. customClassNames에만 있는 키를 추가 (DatePickerStylesNames에 속하는 키만)
  Object.keys(customClassNames).forEach((key) => {
    const typedKey = key as DatePickerStylesNames;
    if (!(typedKey in defaultClassNames) && customClassNames[typedKey]) {
      merged[typedKey] = customClassNames[typedKey]!;
    }
  });

  return merged;
};
