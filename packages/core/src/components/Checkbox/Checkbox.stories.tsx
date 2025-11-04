import { Checkbox } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/Checkbox",
  component: Checkbox,
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const defaultCheckbox = Template.bind({});
defaultCheckbox.args = {
  label: "checkbox label",
  description: "description text",
  size: "md",
  disabled: false,
};
