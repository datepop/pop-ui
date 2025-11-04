import { Dropdown } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Dropdown",
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export const DefaultDropdown: StoryObj<typeof Dropdown> = {
  args: {
    label: "label text",
    labelPosition: "top",
    size: "md",
    required: false,
    disabled: false,
    data: ["select 1", "select 2", "select 3"],
  },
};
