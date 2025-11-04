import { Alert } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/Alert",
  component: Alert,
} as Meta<typeof Alert>;

const Template: StoryFn<typeof Alert> = (args) => <Alert {...args} />;

export const DefaultAlert = Template.bind({});
DefaultAlert.args = {
  visible: true,
  type: "success",
  variant: "light",
  title: "alert title",
  children: "alert content",
  top: 0,
  left: 0,
  right: 0,
};
