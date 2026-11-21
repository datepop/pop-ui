import { ColorAqua800, ColorBorderFocus, ColorRed600 } from '@pop-ui/foundation';
import { useId, useState } from 'react';
import { expect, fn, waitFor, within } from 'storybook/test';

import { CONTROL_SIZES } from './controlSize';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Radio } from '../Radio';
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

export const FieldBorders: StoryObj = {
  name: '입력 필드 테두리',
  tags: ['pop-ui-contract'],
  parameters: { layout: 'padded' },
  render: () => (
    <section>
      <h2>입력 필드 테두리</h2>
      <p>필드에 마우스를 올리거나 클릭하고, Tab 키로 다음 필드에 이동해 보세요.</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          maxWidth: 760,
          gap: 32,
        }}
      >
        {['기본', '오류'].map((state) => (
          <fieldset
            key={state}
            style={{ display: 'grid', gap: 18, minWidth: 0, margin: 0, padding: 0, border: 0 }}
          >
            <legend>{state}</legend>
            <TextField
              label="예약자 이름"
              placeholder="이름 입력"
              error={state === '오류' && '예약자 이름을 입력해 주세요.'}
            />
            <Dropdown
              label="예약 상태"
              placeholder="상태 선택"
              data={['예약', '완료']}
              error={state === '오류' && '예약 상태를 선택해 주세요.'}
            />
          </fieldset>
        ))}
      </div>
    </section>
  ),
  play: async ({ canvas, userEvent }) => {
    const normal = within(canvas.getByRole('group', { name: '기본' }));
    const invalid = within(canvas.getByRole('group', { name: '오류' }));
    const text = invalid.getByRole('textbox', { name: '예약자 이름' });
    const select = invalid.getByRole('textbox', { name: '예약 상태' });

    normal.getByRole('textbox', { name: '예약 상태' }).focus();
    await userEvent.tab();
    await expect(text).toHaveFocus();
    await expect(text).toHaveAccessibleDescription('예약자 이름을 입력해 주세요.');
    await waitFor(() =>
      expect(text).toHaveStyle({ outlineColor: ColorBorderFocus, borderTopColor: ColorRed600 }),
    );
    await userEvent.tab();
    await expect(select).toHaveFocus();
    await expect(select).toHaveAccessibleDescription('예약 상태를 선택해 주세요.');
    await waitFor(() =>
      expect(select).toHaveStyle({
        outlineColor: ColorAqua800,
        outlineWidth: '2px',
        outlineOffset: '2px',
        borderTopColor: ColorRed600,
      }),
    );
    select.blur();
  },
};
