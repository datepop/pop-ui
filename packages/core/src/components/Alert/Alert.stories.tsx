import { Alert } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

export const DefaultAlert: StoryObj<typeof Alert> = {
  args: {
    visible: true,
    type: "success",
    variant: "light",
    title: "alert title",
    children: "alert content",
    top: 0,
    left: 0,
    right: 0,
  },
};
