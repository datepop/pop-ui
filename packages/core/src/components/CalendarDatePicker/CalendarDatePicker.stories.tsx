import { useState } from 'react';

import { CalendarDatePicker } from '.';
import customStyles from './CustomStyles.module.scss';
import { getEmptyValueForType, normalizeValueForType } from './utils';

import type { TCalendarDatePickerType } from './types';
import type { DateValue } from '@mantine/dates';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const stackStyle = {
  display: 'grid',
  gap: '24px',
  padding: '24px',
  maxWidth: '980px',
} as const;

const surfaceGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '16px',
} as const;

const surfaceStyle = {
  display: 'grid',
  gap: '12px',
  padding: '16px',
  border: '1px solid #d8d8d8',
  borderRadius: '12px',
  background: '#fbfbfb',
} as const;

const headingStyle = {
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
} as const;

const bodyStyle = {
  margin: 0,
  fontSize: '14px',
  lineHeight: 1.5,
  color: '#666666',
} as const;

const november2025 = new Date(2025, 10, 1);
const november18 = new Date(2025, 10, 18);
const november21 = new Date(2025, 10, 21);
const today = new Date();
const novemberRangeArgs = {
  type: 'range' as const,
  value: [november18, november21] as [Date | null, Date | null],
};

const SHARED_VISUAL_CONTRACT = `
This story set records the aligned inline calendar shell after visual language work landed.

### Shared alignment target for both picker surfaces

- **Spacing scale:** the inline shell now follows the same 12 / 16px rhythm as adjacent form controls, with tighter 40px calendar cells and a more compact header/weekday cadence.
- **Border and radius language:** the inline shell is now flat and borderless, with plain chevrons and circular date states sitting directly on the white surface.
- **Typography:** header and day labels stay in the shared 16px Pretendard body scale, while the today marker stays as plain text nested inside the day cell.
- **State targets to compare:** selected endpoints stay bright aqua, in-range dates read as separate soft-gray circles, and disabled/outside dates fade back to pale gray text.

This task aligns the shell visually only; it does not change exclusion, range reset, or value-model semantics.

CalendarDatePicker stays inline and exclusion-capable in this phase. The behavior split from DatePicker remains intentional.
`;

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
  parameters: {
    docs: {
      description: {
        component: SHARED_VISUAL_CONTRACT,
        story:
          'Confirms the inline CalendarDatePicker shell is visually aligned while keeping excluded days, excluded dates, range reset, and min/max behavior intact.',
      },
    },
  },
} satisfies Meta<typeof CalendarDatePicker>;

export const Playground: StoryObj<typeof CalendarDatePicker> = {};

export const VisualContract_SelectedTodayDisabledAndInRange: StoryObj<typeof CalendarDatePicker> = {
  render: () => (
    <div style={stackStyle}>
      <div style={surfaceGridStyle}>
        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Selected day baseline</h4>
          <p style={bodyStyle}>
            Shows the aligned selected-day fill with the circular highlight treatment and shared
            16px type scale.
          </p>
          <CalendarDatePicker defaultDate={november2025} value={november18} />
        </div>

        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Range baseline with in-range fill</h4>
          <p style={bodyStyle}>
            Shows the preserved range logic with discrete light-gray in-range circles between the
            aqua endpoints.
          </p>
          <CalendarDatePicker
            {...(novemberRangeArgs as unknown as React.ComponentProps<typeof CalendarDatePicker>)}
            defaultDate={november2025}
          />
        </div>

        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Today baseline with today indicator</h4>
          <p style={bodyStyle}>
            Shows the updated today treatment with the plain-text 오늘 indicator.
          </p>
          <CalendarDatePicker defaultDate={today} highlightToday value={today} />
        </div>

        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Disabled and bounded dates baseline</h4>
          <p style={bodyStyle}>
            Shows excluded days, excluded dates, and min/max bounds with the aligned disabled
            styling.
          </p>
          <CalendarDatePicker
            defaultDate={november2025}
            excludedDates={['2025-11-14', ['2025-11-18', '2025-11-19']]}
            excludedDays={[0]}
            minDate="2025-11-10"
            maxDate="2025-11-20"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Shows the aligned selected, today, disabled, and in-range states on the inline calendar surface while keeping its exclusion behavior and range reset intact.',
      },
    },
  },
};

export const BehaviorPreserved_ExcludedDays: StoryObj<typeof CalendarDatePicker> = {
  args: {
    type: 'default',
    excludedDays: [0, 6],
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
    docs: {
      description: {
        story:
          'Keeps the excludedDays behavior reviewable while alignment work is still blocked to stories/tests only.',
      },
    },
  },
};

export const BehaviorPreserved_ExcludedDatesAndBounds: StoryObj<typeof CalendarDatePicker> = {
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
    docs: {
      description: {
        story:
          'Preserves the current range, exclusion, and min/max behavior contract while the aligned shell stays visual only.',
      },
    },
  },
};

export const BehaviorPreserved_CustomClassNameMerging: StoryObj<typeof CalendarDatePicker> = {
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
Confirms the existing className/classNames merge behavior remains intact while the aligned visual baseline is being documented.

- **Wrapper:** custom wrapper class still applies
- **Day:** custom day class still merges with default state classes
- **Weekday:** custom weekday class still merges with the default typography and spacing
        `,
      },
    },
  },
};
