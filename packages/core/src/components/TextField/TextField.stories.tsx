import { TextField } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/TextField",
  component: TextField,
} satisfies Meta<typeof TextField>;

export const LabelTextField: StoryObj<typeof TextField> = {
  args: {
    label: "label text",
    labelPosition: "top",
    size: "md",
    required: false,
    disabled: false,
  },
};

export const ToolTipTextField: StoryObj<typeof TextField> = {
  args: {
    label: "label text",
    labelPosition: "top",
    tooltip: "tootip text",
    tooltipPosition: "top",
    size: "md",
    required: false,
    disabled: false,
  },
};

export const Textarea: StoryObj<typeof TextField> = {
  args: {
    label: "label text",
    labelPosition: "top",
    size: "md",
    required: false,
    disabled: false,
    textarea: true,
    minRows: 4,
    maxTextCount: 100,
  },
};
