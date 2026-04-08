import { Button } from './';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './type';

import type { IButtonProps, TButtonVariant } from './type';
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
      description: 'Disables the button and replaces children with a loader.',
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

export const States: StoryObj<IButtonProps> = {
  render: (args) => (
    <div style={stackStyle}>
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
            Loading
          </Button>
        </div>
      ))}
    </div>
  ),
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    disabled: { table: { disable: true } },
    isLoading: { table: { disable: true } },
  },
};
