import { StoryFn, Meta } from "@storybook/react";
import { Alert } from ".";

export default {
  title: "Core/Alert",
  component: Alert,
} as Meta<typeof Alert>;

const Template: StoryFn<typeof Alert> = (args) => <Alert {...args} />;

export const defaultAlert = Template.bind({});
defaultAlert.args = {
  visible: true,
  type: "success",
  variant: "light",
  title: "alert title",
  children: "alert content",
  top: 0,
  left: 0,
  right: 0,
};
