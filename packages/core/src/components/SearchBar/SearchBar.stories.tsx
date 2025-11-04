import { SearchBar } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/SearchBar",
  component: SearchBar,
} as Meta<typeof SearchBar>;

const Template: StoryFn<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const DefaultSearchBar = Template.bind({});
DefaultSearchBar.args = {
  label: "label text",
  labelPosition: "top",
  size: "md",
  required: false,
  disabled: false,
  data: ["select 1", "select 2", "select 3"],
};
