import { StoryFn, Meta } from "@storybook/react";
import { Radio } from ".";

export default {
  title: "Core/Radio",
  component: Radio,
} as Meta<typeof Radio>;

const Template: StoryFn<typeof Radio> = (args) => <Radio {...args} />;

export const defaultRadio = Template.bind({});
defaultRadio.args = {
  label: "radio label",
  description: "description text",
  size: "md",
  disabled: false,
};
