import { IconBookmark } from '@pop-ui/foundation';
import { useEffect, useRef, useState } from 'react';
import { expect, waitFor } from 'storybook/test';

import { Button } from './';
import comparison from './PrimaryBackground.stories.module.scss';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './types';
import { Checkbox } from '../Checkbox';

import type { IButtonProps, TButtonVariant } from './types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const VARIANT_LABELS: Record<TButtonVariant, string> = {
  primary: 'Primary',
  primaryLine: 'Primary Line',
  basic: 'Basic',
  danger: 'Danger',
  setting: 'Setting',
  warning: 'Warning',
  ghost: 'Ghost',
};

const variants: Array<{ label: string; value: TButtonVariant }> = BUTTON_VARIANTS.map((value) => ({
  label: VARIANT_LABELS[value],
  value,
}));

const stackStyle = { display: 'flex', flexDirection: 'column', gap: '16px' } as const;
const rowStyle = { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' } as const;
const labelStyle = { minWidth: '120px', fontWeight: 600 } as const;

export default {
  title: 'Core/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    isLoading: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
      description:
        'Canonical button variants. `danger` remains a compatibility alias of the warning token family.',
    },
    size: {
      control: 'inline-radio',
      options: BUTTON_SIZES,
      description: 'Canonical button sizes.',
    },
    isLoading: {
      control: 'boolean',
      description:
        'Disables the button and shows a centered loader while preserving its width by default.',
    },
    loading: {
      table: { disable: true },
    },
    loaderProps: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'SCSS-module-styled Mantine button wrapper with canonical `variant`, `size`, `disabled`, and `isLoading` behavior.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export const Playground: StoryObj<IButtonProps> = {};

function LabelAlignmentComparison() {
  const [showGuides, setShowGuides] = useState(false);
  const [lowerLabel, setLowerLabel] = useState(false);
  return (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <Checkbox
          label="버튼 중심선 표시"
          size="sm"
          checked={showGuides}
          onChange={(event) => setShowGuides(event.currentTarget.checked)}
        />
        <Checkbox
          label="글자만 2px 아래로"
          size="sm"
          checked={lowerLabel}
          onChange={(event) => setLowerLabel(event.currentTarget.checked)}
        />
      </div>
      {BUTTON_SIZES.map((size) => (
        <section key={size} aria-label={size}>
          <strong>{size}</strong>
          <div style={{ ...rowStyle, marginTop: 8 }}>
            {['저장하기', 'Save', 'SAVE', 'Apply', '예약 Pay'].map((label) => (
              <div key={label} style={{ position: 'relative' }}>
                <Button
                  size={size}
                  variant="setting"
                  leftSection={<IconBookmark size={24} color="currentColor" />}
                >
                  <span style={{ position: 'relative', top: lowerLabel ? 2 : 0 }}>{label}</span>
                </Button>
                {showGuides && (
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: '50%',
                      insetInline: 0,
                      borderTop: '1px dashed #2269a9',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export const LabelAlignment: StoryObj<IButtonProps> = {
  name: '한글·영문 라벨 정렬',
  parameters: { layout: 'centered' },
  render: () => <LabelAlignmentComparison />,
};

export const Variants: StoryObj<IButtonProps> = {
  render: (args) => (
    <div style={stackStyle}>
      {variants.map(({ label, value }) => (
        <div key={value} style={rowStyle}>
          <span style={labelStyle}>{label}</span>
          <Button {...args} variant={value} size="md">
            {args.children}
          </Button>
        </div>
      ))}
    </div>
  ),
  args: {
    children: 'Button',
    hideLabelOnLoading: false,
  },
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
  },
};

export const Sizes: StoryObj<IButtonProps> = {
  render: (args) => (
    <div style={stackStyle}>
      {BUTTON_SIZES.map((size) => (
        <div key={size} style={rowStyle}>
          <span style={labelStyle}>{size.toUpperCase()}</span>
          {variants.map(({ value }) => (
            <Button key={`${size}-${value}`} {...args} size={size} variant={value}>
              {value}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
  },
};

function LoadingWidthExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const completionTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [width, setWidth] = useState<number>();
  const sampleRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const button = sampleRef.current?.querySelector('button');
    if (!button) return;

    const observer = new ResizeObserver(() =>
      setWidth(Math.round(button.getBoundingClientRect().width)),
    );
    observer.observe(button, { box: 'border-box' });
    return () => {
      observer.disconnect();
      clearTimeout(completionTimer.current);
    };
  }, []);

  return (
    <section aria-label="로딩 전후 너비" style={stackStyle}>
      <strong>로딩 전후 너비</strong>
      <Checkbox
        label="로딩 상태"
        size="sm"
        checked={isLoading}
        onChange={(event) => {
          clearTimeout(completionTimer.current);
          setIsLoading(event.currentTarget.checked);
        }}
      />
      <form
        ref={sampleRef}
        style={rowStyle}
        onSubmit={(event) => {
          event.preventDefault();
          setSaveCount((count) => count + 1);
          setIsLoading(true);
          completionTimer.current = setTimeout(() => setIsLoading(false), 1500);
        }}
      >
        <Button type="submit" isLoading={isLoading}>
          저장하기
        </Button>
        <output>{width != null && `너비 ${width}px`}</output>
        <output aria-label="저장 횟수">저장 {saveCount}회</output>
      </form>
    </section>
  );
}

export const States: StoryObj<IButtonProps> = {
  tags: ['pop-ui-contract'],
  render: (args) => (
    <div style={stackStyle}>
      <LoadingWidthExample />
      {variants.map(({ label, value }) => (
        <div key={value} style={rowStyle}>
          <span style={labelStyle}>{label}</span>
          <Button {...args} variant={value} size="md">
            Default
          </Button>
          <Button {...args} variant={value} size="md" disabled>
            Disabled
          </Button>
          <Button {...args} variant={value} size="md" isLoading>
            Default
          </Button>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    await canvasElement.ownerDocument.fonts.ready;
    const button = canvas.getByRole('button', { name: '저장하기' });
    const width = button.getBoundingClientRect().width;
    const checkbox = canvas.getByRole('checkbox', { name: '로딩 상태' });
    checkbox.focus();
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await expect(button).toHaveAccessibleName('저장하기');
    await expect(button.getBoundingClientRect().width).toBe(width);
    await userEvent.keyboard('{Enter}[Space]');
    await expect(canvas.getByLabelText('저장 횟수')).toHaveTextContent('1회');
    await waitFor(() => expect(button).not.toHaveAttribute('aria-busy'), { timeout: 4000 });
    await expect(button).toHaveFocus();
    await expect(button.getBoundingClientRect().width).toBe(width);
    await userEvent.keyboard('[Space]');
    await expect(canvas.getByLabelText('저장 횟수')).toHaveTextContent('2회');
    await userEvent.tab();
    const next = canvas.getAllByRole('button', { name: 'Default' })[0];
    await expect(next).toHaveFocus();
    await waitFor(() => expect(button).not.toHaveAttribute('aria-busy'), { timeout: 4000 });
    await expect(next).toHaveFocus();
  },
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    disabled: { table: { disable: true } },
    isLoading: { table: { disable: true } },
  },
};

// Keep the existing Storybook link when the comparison changes.
export const PrimaryLabelContrast: StoryObj<IButtonProps> = {
  name: 'Primary 배경과 포커스 비교',
  tags: ['pop-ui-contract'],
  parameters: { layout: 'padded' },
  render: () => (
    <section>
      <h2>Primary 버튼 배경 비교</h2>
      <p>버튼에 마우스를 올리거나 누르고, Tab 키로 포커스를 이동해 보세요.</p>
      <div style={{ ...rowStyle, gap: '32px', alignItems: 'flex-start' }}>
        {['현재 배경', '한 단계 짙은 배경'].map((title, index) => (
          <fieldset key={title} style={{ margin: 0, padding: 0, border: 0 }}>
            <legend style={{ marginBottom: 12, fontWeight: 600 }}>{title}</legend>
            <div
              style={rowStyle}
              className={index === 1 ? comparison.PrimaryBackgroundCandidate : undefined}
            >
              {['저장하기', 'Save'].map((label) => (
                <Button
                  key={label}
                  size="md"
                  variant="primary"
                  leftSection={<IconBookmark size={24} color="currentColor" />}
                >
                  {label}
                </Button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  ),
  play: async ({ canvas }) => {
    for (const name of ['현재 배경', '한 단계 짙은 배경']) {
      const group = canvas.getByRole('group', { name });
      const buttons = group.querySelectorAll('button');
      await expect(Array.from(buttons, (button) => button.textContent)).toEqual([
        '저장하기',
        'Save',
      ]);
      for (const button of buttons) {
        await expect(button).toHaveStyle({
          color: 'rgb(255, 255, 255)',
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '20px',
        });
        await expect(getComputedStyle(button.querySelector('path')!).stroke).toBe(
          'rgb(255, 255, 255)',
        );
      }
    }
  },
};
