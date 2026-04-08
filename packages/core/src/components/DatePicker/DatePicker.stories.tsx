import { useState } from 'react';

import { DatePicker } from '.';

import type { IDatePickerProps } from '.';
import type { Meta, StoryObj } from '@storybook/react-vite';

const stackStyle = {
  display: 'grid',
  gap: '24px',
  padding: '24px',
  maxWidth: '720px',
} as const;

const rowStyle = {
  display: 'grid',
  gap: '12px',
} as const;

const surfaceGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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

const outputStyle = {
  fontSize: '12px',
  fontFamily: 'monospace',
  padding: '6px 10px',
  background: '#f3f3f3',
  border: '1px solid #e0e0e0',
  borderRadius: '6px',
  color: '#333',
  minHeight: '28px',
} as const;

export default {
  title: 'Core/DatePicker',
  component: DatePicker,
  args: {
    size: 'md',
    type: 'default',
    disabled: false,
    withTime: false,
    highlightToday: false,
    placeholder: '날짜를 선택하세요',
    displayValueFormat: 'YYYY년 MM월 DD일',
    valueFormat: 'YYYY-MM-DD',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '입력창 크기',
    },
    type: {
      control: 'radio',
      options: ['default', 'multiple', 'range'],
      description: '선택 모드',
    },
    disabled: {
      control: 'boolean',
    },
    withTime: {
      control: 'boolean',
      description: '시간 선택 포함 여부 (DateTimePicker로 렌더링)',
    },
    highlightToday: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    displayValueFormat: {
      control: 'text',
      description: '입력창에 표시되는 날짜 형식 (YYYY, YY, MM, M, DD, D 토큰 지원)',
    },
    valueFormat: {
      control: 'text',
      description: 'onChange가 emit하는 문자열 형식',
    },
    // 복잡한 props — Controls 패널에서 숨김
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    minDate: { table: { disable: true } },
    maxDate: { table: { disable: true } },
    excludedDates: { table: { disable: true } },
    excludedDays: { table: { disable: true } },
    popoverProps: { table: { disable: true } },
    rightSection: { table: { disable: true } },
    rightSectionWidth: { table: { disable: true } },
    className: { table: { disable: true } },
    label: { table: { disable: true } },
    description: { table: { disable: true } },
    error: { table: { disable: true } },
    clearable: { table: { disable: true } },
  },
} satisfies Meta<typeof DatePicker>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: StoryObj<typeof DatePicker> = {
  render: (args) => {
    const [output, setOutput] = useState<string>('—');

    const handleChange: IDatePickerProps['onChange'] = (value) => {
      setOutput(JSON.stringify(value));
    };

    return (
      <div style={{ padding: '24px', display: 'grid', gap: '12px', maxWidth: '320px' }}>
        <DatePicker {...args} onChange={handleChange} />
        <div>
          <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>
            onChange 출력값
          </div>
          <div style={outputStyle}>{output}</div>
        </div>
      </div>
    );
  },
};

// ─── displayValueFormat 포맷 변형 ─────────────────────────────────────────────

export const DisplayValueFormat: StoryObj<typeof DatePicker> = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <h3 style={headingStyle}>displayValueFormat 토큰 조합</h3>
        <p style={bodyStyle}>
          입력창에 표시되는 날짜 형식입니다. <code>YYYY / YY / MM / M / DD / D</code> 토큰을 조합할
          수 있습니다. onChange가 emit하는 값은 별도의 <code>valueFormat</code>이 결정합니다.
        </p>
      </div>

      <div style={surfaceGridStyle}>
        {(
          [
            { fmt: 'YYYY년 MM월 DD일', label: 'YYYY년 MM월 DD일 (기본값)' },
            { fmt: 'YY년 M월 D일', label: 'YY년 M월 D일' },
            { fmt: 'YYYY/MM/DD', label: 'YYYY/MM/DD' },
            { fmt: 'YYYY.MM.DD', label: 'YYYY.MM.DD' },
            { fmt: 'MM-DD-YYYY', label: 'MM-DD-YYYY' },
            { fmt: 'M/D/YY', label: 'M/D/YY' },
          ] as { fmt: string; label: string }[]
        ).map(({ fmt, label }) => (
          <div key={fmt} style={surfaceStyle}>
            <h4 style={{ ...headingStyle, fontSize: '13px' }}>{label}</h4>
            <DatePicker
              displayValueFormat={fmt}
              defaultValue="2026-04-06"
              placeholder="날짜를 선택하세요"
            />
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`displayValueFormat` 토큰 조합별 입력창 표시 결과를 비교합니다. `YY`, `M`, `D` 비패딩 토큰이 정상 동작하는지 확인하세요.',
      },
    },
  },
};

// ─── valueFormat onChange 출력 ─────────────────────────────────────────────────

export const ValueFormat: StoryObj<typeof DatePicker> = {
  render: () => {
    const formats = [
      { fmt: 'YYYY-MM-DD', label: 'YYYY-MM-DD (기본값)' },
      { fmt: 'YYYYMMDD', label: 'YYYYMMDD' },
      { fmt: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
      { fmt: 'YY-MM-DD', label: 'YY-MM-DD' },
    ] as { fmt: string; label: string }[];

    return (
      <div style={stackStyle}>
        <div style={rowStyle}>
          <h3 style={headingStyle}>valueFormat — onChange emit 형식</h3>
          <p style={bodyStyle}>
            날짜를 선택하면 <code>valueFormat</code>으로 포맷된 문자열이 emit됩니다. 입력창에는 항상{' '}
            <code>YYYY년 MM월 DD일</code>이 표시됩니다.
          </p>
        </div>
        <ValueFormatItems formats={formats} />
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '`valueFormat`별로 `onChange`가 emit하는 문자열을 확인합니다.',
      },
    },
  },
};

function ValueFormatItems({ formats }: { formats: { fmt: string; label: string }[] }) {
  const [outputs, setOutputs] = useState<Record<string, string>>({});

  return (
    <div style={surfaceGridStyle}>
      {formats.map(({ fmt, label }) => (
        <div key={fmt} style={surfaceStyle}>
          <h4 style={{ ...headingStyle, fontSize: '13px' }}>{label}</h4>
          <DatePicker
            valueFormat={fmt}
            displayValueFormat="YYYY년 MM월 DD일"
            placeholder="날짜를 선택하세요"
            onChange={(v) => setOutputs((prev) => ({ ...prev, [fmt]: JSON.stringify(v) }))}
          />
          <div style={outputStyle}>{outputs[fmt] ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}

// ─── type별 onChange 출력 ──────────────────────────────────────────────────────

export const TypeModes: StoryObj<typeof DatePicker> = {
  render: () => <TypeModesDemo />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`type` 별로 `onChange`가 emit하는 값의 형태를 확인합니다. default: `string | null`, multiple: `string[]`, range: `[string|null, string|null]`',
      },
    },
  },
};

function TypeModesDemo() {
  const [defaultOut, setDefaultOut] = useState('—');
  const [multipleOut, setMultipleOut] = useState('—');
  const [rangeOut, setRangeOut] = useState('—');

  return (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <h3 style={headingStyle}>type별 onChange 출력 형태</h3>
        <p style={bodyStyle}>
          선택 모드에 따라 <code>onChange</code>의 값 타입이 달라집니다.
        </p>
      </div>
      <div style={surfaceGridStyle}>
        <div style={surfaceStyle}>
          <h4 style={headingStyle}>default</h4>
          <DatePicker
            type="default"
            placeholder="단일 날짜"
            onChange={(v) => setDefaultOut(JSON.stringify(v))}
          />
          <div style={outputStyle}>{defaultOut}</div>
        </div>
        <div style={surfaceStyle}>
          <h4 style={headingStyle}>multiple</h4>
          <DatePicker
            type="multiple"
            placeholder="복수 날짜"
            onChange={(v) => setMultipleOut(JSON.stringify(v))}
          />
          <div style={outputStyle}>{multipleOut}</div>
        </div>
        <div style={surfaceStyle}>
          <h4 style={headingStyle}>range</h4>
          <DatePicker
            type="range"
            placeholder="기간 선택"
            onChange={(v) => setRangeOut(JSON.stringify(v))}
          />
          <div style={outputStyle}>{rangeOut}</div>
        </div>
      </div>
    </div>
  );
}

// ─── 기존 Visual Contract 스토리 ──────────────────────────────────────────────

export const VisualContract_InputChromeBaselineBySize: StoryObj<typeof DatePicker> = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <h3 style={headingStyle}>Input chrome baseline</h3>
        <p style={bodyStyle}>
          Freezes the current size ladder for spacing, type size, and calendar icon scale on the
          popup-oriented surface.
        </p>
      </div>

      <div style={surfaceGridStyle}>
        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Small · 30px shell · 14px icon</h4>
          <DatePicker size="sm" placeholder="Small baseline" />
        </div>

        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Medium · 40px shell · 18px icon</h4>
          <DatePicker size="md" placeholder="Medium baseline" />
        </div>

        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Large · 50px shell · 24px icon</h4>
          <DatePicker size="lg" placeholder="Large baseline" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const VisualContract_BehaviorModesAndSharedStateTargets: StoryObj<typeof DatePicker> = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <h3 style={headingStyle}>Behavior modes held constant</h3>
        <p style={bodyStyle}>Freezes the input/popup surface modes after alignment landed.</p>
      </div>

      <div style={surfaceGridStyle}>
        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Default selection</h4>
          <DatePicker placeholder="Single date" />
        </div>

        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Range selection</h4>
          <DatePicker type="range" placeholder="Range selection" />
        </div>

        <div style={surfaceStyle}>
          <h4 style={headingStyle}>Date and time</h4>
          <DatePicker withTime placeholder="Date and time" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
