import { useState } from 'react';

import { CalendarDatePicker } from '.';
import customStyles from './CustomStyles.module.scss';
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
    highlightToday: false,
    type: 'default',
    excludedDays: [],
    excludedDates: [],
  },
  argTypes: {
    value: { control: false },
    onChange: { action: 'change' },
  },
  decorators: [withTypeResetDecorator],
} satisfies Meta<typeof CalendarDatePicker>;

export const DefaultDatePicker: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'default',
    excludedDays: [],
    excludedDates: [],
    highlightToday: false,
  },
};

export const WithExcludedDays: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'default',
    excludedDays: [0, 6], // 주말 제외
  },
  argTypes: {
    excludedDays: {
      options: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '주말'],
      mapping: {
        일요일: [0],
        월요일: [1],
        화요일: [2],
        수요일: [3],
        목요일: [4],
        금요일: [5],
        토요일: [6],
        주말: [0, 6],
      },
      control: { type: 'radio' },
    },
  },
  parameters: {
    controls: {
      exclude: ['type', 'excludedDates'],
    },
  },
};

export const WithExcludedDates: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'range',
    excludedDates: ['2025-11-28', '2025-12-25', ['2025-12-28', '2026-01-03']],
    minDate: '2025-11-02',
    maxDate: '2025-12-31',
  },
  parameters: {
    controls: {
      exclude: ['excludedDays'],
    },
  },
};

export const WithCustomStyles: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'range',
    highlightToday: false,
    className: customStyles.customWrapper,
    classNames: {
      day: customStyles.customDay,
      weekday: customStyles.customWeekday,
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**스타일 커스터마이징 테스트**

\`className\`과 \`classNames\`가 모두 주어졌을 때 기본 스타일과 올바르게 병합되는지 확인합니다.

- **Wrapper**: 커스텀 테두리 + 배경 적용 (className)
- **Header**: 커스텀 배경색 적용 (classNames)
- **Day**: 커스텀 배경색 + 글자색 적용 (classNames)
- **Override**: \`data-weekend\` 등의 상태 스타일도 커스텀 클래스가 정상적으로 덮어써야 함
        `,
      },
    },
  },
};
