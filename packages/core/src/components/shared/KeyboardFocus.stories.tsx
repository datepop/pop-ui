import {
  ColorAqua800,
  ColorBorderError,
  ColorBorderFocus,
  ColorTextError,
} from '@pop-ui/foundation';
import { useId, useState } from 'react';
import { expect, fn, waitFor, within } from 'storybook/test';

import { CONTROL_SIZES } from './controlSize';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Radio } from '../Radio';
import { SearchBar } from '../SearchBar';
import { TextField } from '../TextField';
import { Toggle } from '../Toggle';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Examples/Keyboard focus',
  parameters: { layout: 'centered' },
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;

function ReservationStatusExample() {
  const name = useId();
  const [status, setStatus] = useState('예약');
  const [disableReserved, setDisableReserved] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <Checkbox
        label="예약 항목 비활성화"
        checked={disableReserved}
        onChange={(event) => {
          const disabled = event.currentTarget.checked;
          setDisableReserved(disabled);
          if (disabled && status === '예약') setStatus('전체');
        }}
      />
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend>예약 상태</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 8 }}>
          {['전체', '예약', '완료'].map((value) => (
            <Radio
              key={value}
              name={name}
              label={value}
              value={value}
              checked={status === value}
              disabled={disableReserved && value === '예약'}
              onChange={(event) => setStatus(event.currentTarget.value)}
            />
          ))}
        </div>
      </fieldset>
      <TextField label="검색어" />
    </div>
  );
}

export const RadioGroup: StoryObj = {
  name: 'Radio 그룹',
  tags: ['pop-ui-contract'],
  render: () => <ReservationStatusExample />,
  play: async ({ canvas, userEvent }) => {
    const group = within(canvas.getByRole('group', { name: '예약 상태' }));
    const disable = canvas.getByRole('checkbox', { name: '예약 항목 비활성화' });
    const selected = async (name: string) => {
      const radio = group.getByRole('radio', { name, checked: true });
      await expect(radio).toHaveFocus();
      await expect(group.getAllByRole('radio', { checked: true })).toHaveLength(1);
    };

    disable.focus();
    await userEvent.tab();
    await selected('예약');
    await expect(group.getByRole('radio', { name: '예약' })).toHaveStyle({
      outlineColor: ColorAqua800,
      outlineWidth: '2px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
    });
    await userEvent.keyboard('{ArrowRight}');
    await selected('완료');
    await userEvent.keyboard('{ArrowDown}');
    await selected('전체');
    await userEvent.tab();
    await expect(canvas.getByRole('textbox', { name: '검색어' })).toHaveFocus();
    await userEvent.tab({ shift: true });
    await selected('전체');
    await userEvent.click(disable);
    await expect(group.getByRole('radio', { name: '예약' })).toBeDisabled();
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    await selected('완료');
    await userEvent.keyboard('{ArrowUp}');
    await selected('전체');
    await userEvent.click(disable);
    await userEvent.tab();
    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
    await selected('예약');
  },
};

export const CheckboxAndToggle: StoryObj<typeof Checkbox> = {
  name: 'Checkbox · Toggle',
  tags: ['pop-ui-contract'],
  render: ({ onChange }) => (
    <div style={{ display: 'grid', gap: 24 }}>
      {[...CONTROL_SIZES, 'disabled' as const].map((row) => {
        const disabled = row === 'disabled';
        const size = disabled ? 'md' : row;
        return (
          <section key={row} aria-label={row}>
            <strong>{disabled ? '비활성' : size}</strong>
            <div
              style={{
                display: 'flex',
                gap: 24,
                flexWrap: 'wrap',
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <Checkbox size={size} label="이용약관 동의" disabled={disabled} onChange={onChange} />
              <Toggle
                size={size}
                label="알림 받기"
                labelPosition="right"
                disabled={disabled}
                onChange={onChange}
              />
            </div>
          </section>
        );
      })}
    </div>
  ),
  play: async ({ args, canvas, userEvent }) => {
    let changes = 0;
    for (const size of CONTROL_SIZES) {
      const row = within(canvas.getByRole('region', { name: size }));
      for (const role of ['checkbox', 'switch'] as const) {
        const input = row.getByRole<HTMLInputElement>(role);
        await userEvent.tab();
        await expect(input).toHaveFocus();
        const ring = role === 'switch' ? input.nextElementSibling! : input;
        await expect(ring).toHaveStyle({
          outlineWidth: '2px',
          outlineStyle: 'solid',
          outlineColor: ColorAqua800,
          outlineOffset: '2px',
        });
        await userEvent.keyboard('[Space]');
        await expect(input).toBeChecked();
        await expect(input).toHaveFocus();
        await expect(args.onChange).toHaveBeenCalledTimes(++changes);
      }
    }
    await userEvent.tab();
    const disabled = within(canvas.getByRole('region', { name: 'disabled' }));
    for (const role of ['checkbox', 'switch'] as const) {
      const input = disabled.getByRole<HTMLInputElement>(role);
      await expect(input).toBeDisabled();
      await expect(input).not.toHaveFocus();
      await userEvent.click(input.labels![0]);
      await expect(input).not.toBeChecked();
    }
    await expect(args.onChange).toHaveBeenCalledTimes(changes);
    for (const size of CONTROL_SIZES) {
      const row = within(canvas.getByRole('region', { name: size }));
      for (const role of ['checkbox', 'switch'] as const) {
        const input = row.getByRole<HTMLInputElement>(role);
        await userEvent.click(input.labels![0]);
        await expect(input).not.toBeChecked();
        await expect(args.onChange).toHaveBeenCalledTimes(++changes);
      }
    }
  },
};

function ReservationFields({ validate }: { validate: boolean }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  return (
    <fieldset style={{ display: 'grid', gap: 18, minWidth: 0, margin: 0, padding: 0, border: 0 }}>
      <legend>{validate ? '오류 복구' : '기본'}</legend>
      <TextField
        label="예약자 이름"
        placeholder="이름 입력"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        error={validate && !name.trim() && '예약자 이름을 입력해 주세요.'}
      />
      <Dropdown
        label="예약 상태"
        placeholder="상태 선택"
        data={['예약', '완료']}
        value={status}
        onChange={setStatus}
        error={validate && !status && '예약 상태를 선택해 주세요.'}
      />
      <SearchBar
        label="장소 검색"
        placeholder="장소 입력"
        data={['서울시청', '홍대입구']}
        value={query}
        onChange={setQuery}
        error={validate && !query.trim() && '장소를 입력해 주세요.'}
      />
      {validate && (
        <div>
          <Button
            size="sm"
            variant="basic"
            onClick={() => {
              setName('');
              setStatus(null);
              setQuery('');
            }}
          >
            입력 초기화
          </Button>
        </div>
      )}
    </fieldset>
  );
}

export const FieldBorders: StoryObj = {
  name: '입력 필드 상태와 오류 복구',
  tags: ['pop-ui-contract'],
  parameters: { layout: 'padded' },
  render: () => (
    <section>
      <h2>입력 필드 상태와 오류 복구</h2>
      <p>Tab으로 이동하며 이름과 장소를 입력하고 예약 상태를 선택해 보세요.</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          maxWidth: 760,
          gap: 32,
        }}
      >
        <ReservationFields validate={false} />
        <ReservationFields validate />
      </div>
    </section>
  ),
  play: async ({ canvas, userEvent }) => {
    const normal = within(canvas.getByRole('group', { name: '기본' }));
    const invalid = within(canvas.getByRole('group', { name: '오류 복구' }));
    const name = invalid.getByRole('textbox', { name: '예약자 이름' });
    const status = invalid.getByRole('textbox', { name: '예약 상태' });
    const query = invalid.getByRole('textbox', { name: '장소 검색' });

    async function checkError(input: HTMLElement, message: string, outline: string) {
      await expect(input).toHaveFocus();
      await expect(input).toHaveAttribute('aria-invalid', 'true');
      await expect(input).toHaveAccessibleDescription(message);
      await expect(invalid.getByText(message)).toHaveStyle({ color: ColorTextError });
      await waitFor(() =>
        expect(input).toHaveStyle({ outlineColor: outline, borderTopColor: ColorBorderError }),
      );
    }

    async function checkRecovered(input: HTMLElement, message: string, outline: string) {
      await expect(input).toHaveFocus();
      await expect(input).toHaveAttribute('aria-invalid', 'false');
      await expect(input).toHaveStyle({ outlineColor: outline, outlineStyle: 'solid' });
      await expect(input).not.toHaveAccessibleDescription(message);
      await expect(invalid.queryByText(message)).not.toBeInTheDocument();
      await waitFor(() => expect(input).not.toHaveStyle({ borderTopColor: ColorBorderError }));
    }

    normal.getByRole('textbox', { name: '장소 검색' }).focus();
    await userEvent.tab();
    await checkError(name, '예약자 이름을 입력해 주세요.', ColorBorderFocus);
    await userEvent.keyboard('민지');
    await checkRecovered(name, '예약자 이름을 입력해 주세요.', ColorBorderFocus);
    await userEvent.tab();
    await checkError(status, '예약 상태를 선택해 주세요.', ColorAqua800);
    await expect(status).toHaveStyle({ outlineWidth: '2px', outlineOffset: '2px' });
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(status).toHaveValue('예약');
    await checkRecovered(status, '예약 상태를 선택해 주세요.', ColorAqua800);
    await userEvent.tab();
    await checkError(query, '장소를 입력해 주세요.', ColorBorderFocus);
    await userEvent.keyboard('서울');
    await checkRecovered(query, '장소를 입력해 주세요.', ColorBorderFocus);
    await userEvent.keyboard('{Escape}');
    await userEvent.click(invalid.getByRole('button', { name: '입력 초기화' }));
    for (const input of [name, status, query]) {
      await expect(input).toHaveValue('');
      await expect(input).toHaveAttribute('aria-invalid', 'true');
    }
  },
};
