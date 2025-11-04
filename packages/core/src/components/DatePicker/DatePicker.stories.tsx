import { DatePicker } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/DatePicker",
  component: DatePicker,
} as Meta<typeof DatePicker>;

const Template: StoryFn<typeof DatePicker> = (args) => <DatePicker {...args} />;

export const DatePicker = Template.bind({});
DatePicker.args = {
  size: "md",
  type: "default",
  disabled: false,
  withTime: false,
};

export const DateTimePicker = Template.bind({});
DateTimePicker.args = {
  size: "md",
  disabled: false,
  withTime: true,
};

export const RangePicker = Template.bind({});
RangePicker.args = {
  size: "md",
  type: "range",
  disabled: false,
  withTime: false,
};
