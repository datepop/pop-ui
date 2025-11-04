import { Radio } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/Radio",
  component: Radio,
} as Meta<typeof Radio>;

const Template: StoryFn<typeof Radio> = (args) => <Radio {...args} />;

export const DefaultRadio = Template.bind({});
DefaultRadio.args = {
  label: "radio label",
  description: "description text",
  size: "md",
  disabled: false,
};
