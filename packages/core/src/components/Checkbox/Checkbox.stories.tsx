import { Checkbox } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '20px',
} as const;
const rowStyle = {
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
} as const;
const labelStyle = { minWidth: '120px', fontWeight: 600 } as const;

export default {
  title: 'Core/Checkbox',
  component: Checkbox,
  args: {
    label: 'checkbox label',
    description: 'description text',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export const Playground: StoryObj<typeof Checkbox> = {};

export const Sizes: StoryObj<typeof Checkbox> = {
  render: () => (
    <div style={rowStyle}>
      <Checkbox label="small checkbox" description="description text" size="sm" />
      <Checkbox label="medium checkbox" description="description text" size="md" />
      <Checkbox label="large checkbox" description="description text" size="lg" />
    </div>
  ),
};

export const States: StoryObj<typeof Checkbox> = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Default</span>
        <Checkbox label="unchecked" description="description text" size="md" />
        <Checkbox label="checked" description="description text" size="md" defaultChecked />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Disabled</span>
        <Checkbox label="disabled" description="description text" size="md" disabled />
        <Checkbox label="disabled checked" size="md" disabled defaultChecked />
      </div>
    </div>
  ),
};

export const ContractMatrix: StoryObj<typeof Checkbox> = {
  render: () => (
    <div style={stackStyle}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={rowStyle}>
          <span style={labelStyle}>{size.toUpperCase()}</span>
          <Checkbox size={size} label={<span>{`${size} label`}</span>} description="unchecked" />
          <Checkbox
            size={size}
            label={<span>{`${size} checked`}</span>}
            description="checked"
            defaultChecked
          />
          <Checkbox
            size={size}
            label={<span>{`${size} disabled`}</span>}
            description="disabled"
            disabled
          />
        </div>
      ))}
    </div>
  ),
};
