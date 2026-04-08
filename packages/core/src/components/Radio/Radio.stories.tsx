import { Radio } from '.';

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
  title: 'Core/Radio',
  component: Radio,
  args: {
    label: 'radio label',
    description: 'description text',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Radio>;

export const Playground: StoryObj<typeof Radio> = {};

export const Sizes: StoryObj<typeof Radio> = {
  render: () => (
    <div style={rowStyle}>
      <Radio label="small radio" description="description text" size="sm" />
      <Radio label="medium radio" description="description text" size="md" />
      <Radio label="large radio" description="description text" size="lg" />
    </div>
  ),
};

export const States: StoryObj<typeof Radio> = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>Default</span>
        <Radio label="unchecked" description="description text" size="md" />
        <Radio label="checked" description="description text" size="md" defaultChecked />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Disabled</span>
        <Radio label="disabled" description="description text" size="md" disabled />
        <Radio label="disabled checked" size="md" disabled defaultChecked />
      </div>
    </div>
  ),
};

export const ContractMatrix: StoryObj<typeof Radio> = {
  render: () => (
    <div style={stackStyle}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={rowStyle}>
          <span style={labelStyle}>{size.toUpperCase()}</span>
          <Radio size={size} label={<span>{`${size} label`}</span>} description="unchecked" />
          <Radio
            size={size}
            label={<span>{`${size} checked`}</span>}
            description="checked"
            defaultChecked
          />
          <Radio
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
