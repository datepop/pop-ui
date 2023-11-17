import { StoryFn, Meta } from "@storybook/react";
import { Dropdown } from ".";

export default {
  title: "Core/Dropdown",
  component: Dropdown,
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const defaultDropdown = Template.bind({});
defaultDropdown.args = {
  label: "label text",
  labelPosition: "top",
  size: "md",
  required: false,
  disabled: false,
  data: ["select 1", "select 2", "select 3"],
};
