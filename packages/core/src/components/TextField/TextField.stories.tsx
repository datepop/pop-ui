import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { TextField } from '.';
import { FieldComparison, checkFieldHelp, fieldHelpText } from '../../../../../.storybook/examples/FieldComparison';
import {
  WidthComparison,
  checkComparisonWidth,
} from '../../../../../.storybook/examples/WidthComparison';

import type { Meta, StoryObj } from '@storybook/react-vite';

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '20px',
} as const;

export default {
  title: 'Core/TextField',
  component: TextField,
  args: {
    placeholder: '내용을 입력하세요',
  },
} satisfies Meta<typeof TextField>;

export const Playground: StoryObj<typeof TextField> = {
  args: {
    label: 'label text',
    labelPosition: 'top',
    size: 'md',
    required: false,
    disabled: false,
    description: 'description text',
    error: '',
    textarea: false,
  },
};

export const InputStates: StoryObj<typeof TextField> = {
  render: () => (
    <div style={stackStyle}>
      <TextField label="Top label" labelPosition="top" size="sm" placeholder="small input" />
      <TextField label="Left label" labelPosition="left" size="md" placeholder="left label input" />
      <TextField
        label="With tooltip"
        tooltip="tooltip text"
        tooltipPosition="right"
        description="description text"
        size="lg"
        placeholder="tooltip input"
      />
      <TextField
        label="Error state"
        error="error message"
        description="description text"
        size="md"
        placeholder="error input"
      />
      <TextField label="Disabled" disabled size="md" placeholder="disabled input" />
    </div>
  ),
};

const longExample =
  '데이트팝과 함께하는 주말 산책 모임입니다. 이번 주에는 성수동 골목을 걸으며 작은 서점과 카페를 둘러보고, 서울숲에서 잠시 쉬었다가 저녁을 함께 먹을 예정입니다. 함께 걸어볼까요?';

function NameField({ size = 'md', limit = 12 }: { size?: 'sm' | 'md' | 'lg'; limit?: 12 | 100 }) {
  const [value, setValue] = useState(limit === 12 ? '데이트팝' : longExample);
  return (
    <TextField
      label="이름"
      size={size}
      required
      tooltip="표시할 이름을 입력하세요"
      value={value}
      description={`최대 ${limit}자로 입력하세요`}
      maxTextCount={limit}
      onClear={() => setValue('')}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}

export const ClearableWithCounter: StoryObj<typeof TextField> = {
  name: '이름 입력과 지우기',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ width: 280 }}>
      <NameField />
    </div>
  ),
};

export const SizeAndLimitComparison: StoryObj<typeof TextField> = {
  name: '입력 크기와 글자 수 비교',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 620, margin: '16px auto' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <section key={size} aria-label={size}>
          <h2 style={{ fontSize: 18, margin: 0 }}>{size}</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
              gap: 20,
            }}
          >
            <NameField size={size} limit={12} />
            <NameField size={size} limit={100} />
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Textarea: StoryObj<typeof TextField> = {
  render: () => {
    const [value, setValue] = useState('여러 줄 입력');

    return (
      <div style={stackStyle}>
        <TextField
          textarea
          label="Textarea"
          labelPosition="left"
          minRows={4}
          maxTextCount={100}
          description="textarea keeps canonical helper text and counter support"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </div>
    );
  },
};

export const ContentAtDifferentWidths: StoryObj<typeof TextField> = {
  name: '너비별 콘텐츠',
  tags: ['pop-ui-contract'],
  parameters: { layout: 'padded' },
  play: async (context) => {
    for (const column of await checkComparisonWidth(context)) {
      for (const field of column.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])')) {
        await expect(within(column).getByText(`${field.value.length}/100`)).toBeVisible();
      }
      const message = within(column)
        .getByText('예약에 사용할 이름을 한 글자 이상 입력해주세요.')
        .getBoundingClientRect();
      const counter = within(column).getByText('0/100').getBoundingClientRect();
      await expect(message.right).toBeLessThanOrEqual(counter.left + 1);
    }
  },
  render: () => (
    <WidthComparison>
      <TextField
        label="이름"
        onClear={() => undefined}
        defaultValue="서울시청 근처에서 함께하는 주말 산책 모임"
        maxTextCount={100}
      />
      <TextField
        label="이름"
        onClear={() => undefined}
        defaultValue="SeoulCityHallWeekendWalkingClub"
        maxTextCount={100}
      />
      <TextField
        label="이름"
        placeholder="입력하세요"
        maxTextCount={100}
        error="예약에 사용할 이름을 한 글자 이상 입력해주세요."
      />
    </WidthComparison>
  ),
};

export const FieldFeedback: StoryObj<typeof TextField> = {
  name: '입력 상태와 피드백',
  tags: ['pop-ui-contract', 'pop-ui-field', 'pop-ui-help'],
  parameters: { layout: 'padded' },
  play: checkFieldHelp,
  render: () => (
    <FieldComparison
      renderField={(state, props) => (
        <TextField
          {...props}
          tooltip={state === 'default' ? fieldHelpText : undefined}
          defaultValue={state === 'filled' ? '데이트팝' : undefined}
          maxTextCount={100}
        />
      )}
    />
  ),
};
