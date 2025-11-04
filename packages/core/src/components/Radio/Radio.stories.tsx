import { Radio } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Radio",
  component: Radio,
} satisfies Meta<typeof Radio>;

export const DefaultRadio: StoryObj<typeof Radio> = {
  args: {
    label: "radio label",
    description: "description text",
    size: "md",
    disabled: false,
  },
};
