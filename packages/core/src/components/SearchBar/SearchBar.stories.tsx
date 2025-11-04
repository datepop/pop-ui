import { SearchBar } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/SearchBar",
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export const DefaultSearchBar: StoryObj<typeof SearchBar> = {
  args: {
    label: "label text",
    labelPosition: "top",
    size: "md",
    required: false,
    disabled: false,
    data: ["select 1", "select 2", "select 3"],
  },
};
