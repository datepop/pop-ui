import { useState } from 'react';

import { TextField } from '.';

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
    errorMsg: '',
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
        errorMsg="error message"
        description="description text"
        size="md"
        placeholder="error input"
      />
      <TextField label="Disabled" disabled size="md" placeholder="disabled input" />
    </div>
  ),
};

export const ClearableWithCounter: StoryObj<typeof TextField> = {
  render: () => {
    const [value, setValue] = useState('초기값');

    return (
      <div style={stackStyle}>
        <TextField
          label="Clearable input"
          value={value}
          description="controlled value keeps the clear button and counter in sync"
          maxTextCount={10}
          onClear={() => setValue('')}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </div>
    );
  },
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
