import { StoryFn, Meta } from "@storybook/react";
import { DatePicker } from ".";

export default {
  title: "Core/DatePicker",
  component: DatePicker,
} as Meta<typeof DatePicker>;

const Template: StoryFn<typeof DatePicker> = (args) => <DatePicker {...args} />;

export const datePicker = Template.bind({});
datePicker.args = {
  size: "md",
  type: "default",
  disabled: false,
  withTime: false,
};

export const datetimePicker = Template.bind({});
datetimePicker.args = {
  size: "md",
  disabled: false,
  withTime: true,
};

export const rangePicker = Template.bind({});
rangePicker.args = {
  size: "md",
  type: "range",
  disabled: false,
  withTime: false,
};
