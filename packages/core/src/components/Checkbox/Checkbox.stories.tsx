import { StoryFn, Meta } from "@storybook/react";
import { Checkbox } from ".";

export default {
  title: "Checkbox",
  component: Checkbox,
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  children: "데이트팝 Checkbox",
};
