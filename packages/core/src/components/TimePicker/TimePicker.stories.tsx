import { TimePicker } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/TimePicker",
  component: TimePicker,
} as Meta<typeof TimePicker>;

const Template: StoryFn<typeof TimePicker> = (args) => <TimePicker {...args} />;

export const DefaultTimePicker = Template.bind({});
DefaultTimePicker.args = {
  size: "md",
  disabled: false,
  defaultValue: `${new Date().getHours()}:${new Date().getMinutes()}`,
};
