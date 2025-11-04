import { TimePicker } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/TimePicker",
  component: TimePicker,
} satisfies Meta<typeof TimePicker>;

export const DefaultTimePicker: StoryObj<typeof TimePicker> = {
  args: {
    size: "md",
    disabled: false,
    defaultValue: `${new Date().getHours()}:${new Date().getMinutes()}`,
  },
};
