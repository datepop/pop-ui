import { useState } from 'react';

import { CalendarDatePicker } from '.';
import { getEmptyValueForType, normalizeValueForType } from './utils';

import type { TCalendarDatePickerType } from './types';
import type { DateValue } from '@mantine/dates';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const TypeResetWrapper = ({
  StoryComponent,
  context,
  pickerType,
}: {
  StoryComponent: Parameters<Decorator>[0];
  context: Parameters<Decorator>[1];
  pickerType: TCalendarDatePickerType;
}) => {
  const { args } = context;
  const [rawValue, setRawValue] = useState<DateValue | undefined>(() =>
    getEmptyValueForType(pickerType),
  );

  const normalizedValue = normalizeValueForType(pickerType, rawValue);

  const handleChange = (nextValue: DateValue | undefined) => {
    setRawValue(nextValue);
    if (typeof args.onChange === 'function') {
      args.onChange(nextValue as never);
    }
  };

  return (
    <StoryComponent
      {...context}
      args={{
        ...args,
        value: normalizedValue,
        onChange: handleChange,
      }}
    />
  );
};

const withTypeResetDecorator: Decorator = (Story, context) => {
  const currentType = (context.args.type ?? 'default') as TCalendarDatePickerType;

  return (
    <TypeResetWrapper
      key={`${context.id}-${currentType}`}
      StoryComponent={Story}
      context={context}
      pickerType={currentType}
    />
  );
};

export default {
  title: 'Core/CalendarDatePicker',
  component: CalendarDatePicker,
  args: {
    type: 'default',
    excludedDays: [],
    excludedDates: [],
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
    onChange: { action: 'change' },
  },
  parameters: {
    controls: {
      exclude: ['value', 'defaultValues'],
    },
  },
  decorators: [withTypeResetDecorator],
} satisfies Meta<typeof CalendarDatePicker>;

export const DefaultDatePicker: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'default',
    excludedDays: [],
    excludedDates: [],
  },
};

export const WithExcludedDays: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'default',
    excludedDays: [0, 6], // 주말 제외
  },
  parameters: {
    controls: {
      exclude: ['type', 'excludedDates'],
    },
  },
};

export const WithExcludedDates: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'default',
    excludedDates: ['2025-11-28', '2025-12-25', ['2025-12-28', '2026-01-03']],
  },
  parameters: {
    controls: {
      exclude: ['excludedDays'],
    },
  },
};

export const WithAllExclusions: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'default',
    excludedDays: [0, 6], // 주말 제외
    excludedDates: [
      '2025-11-28', // 추수감사절
      '2025-12-25', // 크리스마스
      ['2025-12-28', '2026-01-03'], // 연말연시 휴가
    ],
  },
};

export const WithRangeValidation: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'range',
    excludedDates: [
      '2025-11-27', // 제외된 날짜
      ['2025-12-24', '2025-12-26'], // 크리스마스 연휴
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          '⚠️ **Range 타입 검증**: 선택한 범위 내에 제외된 날짜가 있으면 선택이 취소됩니다.\n\n예: 11/26 ~ 11/28 범위를 선택하면 11/27이 제외되어 있어 선택이 취소됩니다.',
      },
    },
  },
};
