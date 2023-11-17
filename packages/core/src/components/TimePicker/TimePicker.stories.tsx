import { StoryFn, Meta } from "@storybook/react";
import { TimePicker } from ".";

export default {
  title: "Core/TimePicker",
  component: TimePicker,
} as Meta<typeof TimePicker>;

const Template: StoryFn<typeof TimePicker> = (args) => <TimePicker {...args} />;

export const defaultTimePicker = Template.bind({});
defaultTimePicker.args = {
  size: "md",
  disabled: false,
  defaultValue: `${new Date().getHours()}:${new Date().getMinutes()}`,
};
