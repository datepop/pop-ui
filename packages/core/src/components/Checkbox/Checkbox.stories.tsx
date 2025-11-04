import { Checkbox } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export const DefaultCheckbox: StoryObj<typeof Checkbox> = {
  args: {
    label: "checkbox label",
    description: "description text",
    size: "md",
    disabled: false,
  },
};
