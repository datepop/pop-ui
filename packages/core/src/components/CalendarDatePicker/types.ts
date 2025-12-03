import type { DatePickerProps, DateValue } from '@mantine/dates';

type TDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
/**
 * CalendarDatePickerProps
 * - 기본 Mantine DatePickerProps에서 excludeDate를 제거하고,
 *   커스터마이즈한 excludedDates/excludedDays 옵션을 받는다.
 *
 * excludedDays: [0,1,2,...,6] (0=일요일, 5=금요일 등)
 * excludedDates: ['2025-12-01', ['2025-12-24','2025-12-26'], ...] (각 요소는 [start, end] 문자열, YYYY-MM-DD 권장)
 */
export interface ICalendarDatePickerProps
  extends Omit<DatePickerProps, 'excludeDate' | 'onChange'> {
  type?: 'default' | 'multiple' | 'range';
  showTodayIndicator?: boolean;
  /**
   * onChange callback
   * - Receives DateValue which can be Date, Date[], or [Date, Date] depending on the type prop
   */
  onChange?: (value: DateValue) => void;
  /**
   * 제외할 날짜 배열
   * - 단일 날짜: 'YYYY-MM-DD' 형식의 문자열
   * - 날짜 범위: [시작일, 종료일] 형식의 튜플
   *
   * @example
   * excludedDates={[
   *   '2025-11-24',                    // 단일 날짜
   *   '2025-11-25',                    // 단일 날짜
   *   ['2025-12-24', '2025-12-26'],    // 범위 (크리스마스 연휴)
   *   ['2025-12-28', '2026-01-03'],    // 범위 (연말연시)
   * ]}
   */
  excludedDates?: (string | [string, string])[];
  excludedDays?: TDayOfWeek[]; // Array of day numbers (0-6) where 0 is Sunday
}

export type TExcludeCheckerOptions = {
  excludedDays?: TDayOfWeek[];
  excludedDates?: (string | [string, string])[];
};

export type TCalendarDatePickerType = NonNullable<ICalendarDatePickerProps['type']>;
