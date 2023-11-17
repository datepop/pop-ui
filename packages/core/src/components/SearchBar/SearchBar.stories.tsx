import { StoryFn, Meta } from "@storybook/react";
import { SearchBar } from ".";

export default {
  title: "Core/SearchBar",
  component: SearchBar,
} as Meta<typeof SearchBar>;

const Template: StoryFn<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const defaultSearchBar = Template.bind({});
defaultSearchBar.args = {
  label: "label text",
  labelPosition: "top",
  size: "md",
  required: false,
  disabled: false,
  data: ["select 1", "select 2", "select 3"],
};
