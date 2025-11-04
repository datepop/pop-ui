import { Toggle } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Toggle",
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export const DefaultToggle: StoryObj<typeof Toggle> = {
  args: {
    label: "toggle label",
    labelPosition: "left",
    description: "description text",
    size: "md",
    disabled: false,
  },
};
