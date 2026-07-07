import type { TDayOfWeek } from '../CalendarDatePicker/types';
import type { PopoverProps } from '@mantine/core';
import type { TDateDisplayType } from '@pop-ui/foundation';
import type { ReactNode } from 'react';

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
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
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
  rightSection?: ReactNode;
  rightSectionWidth?: number;
}
