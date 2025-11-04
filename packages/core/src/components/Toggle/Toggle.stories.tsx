import { Toggle } from ".";

import type { StoryFn, Meta } from "@storybook/react";


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
