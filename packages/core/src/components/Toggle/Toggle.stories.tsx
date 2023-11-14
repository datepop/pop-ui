import { StoryFn, Meta } from "@storybook/react";
import { Toggle } from ".";

export default {
  title: "Core/Toggle",
  component: Toggle,
} as Meta<typeof Toggle>;

const Template: StoryFn<typeof Toggle> = (args) => <Toggle {...args} />;

export const defaultToggle = Template.bind({});
defaultToggle.args = {
  label: "toggle label",
  labelPosition: "left",
  description: "description text",
  size: "md",
  disabled: false,
};
