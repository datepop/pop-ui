import { TextField } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/TextField",
  component: TextField,
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => <TextField {...args} />;

export const LabelTextField = Template.bind({});
LabelTextField.args = {
  label: "label text",
  labelPosition: "top",
  size: "md",
  required: false,
  disabled: false,
};

export const ToolTipTextField = Template.bind({});
ToolTipTextField.args = {
  label: "label text",
  labelPosition: "top",
  tooltip: "tootip text",
  tooltipPosition: "top",
  size: "md",
  required: false,
  disabled: false,
};

export const Textarea = Template.bind({});
Textarea.args = {
  label: "label text",
  labelPosition: "top",
  size: "md",
  required: false,
  disabled: false,
  textarea: true,
  minRows: 4,
  maxTextCount: 100,
};
