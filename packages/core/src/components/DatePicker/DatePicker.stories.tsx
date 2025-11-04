import { DatePicker } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/DatePicker",
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export const DefaultDatePicker: StoryObj<typeof DatePicker> = {
  args: {
    size: "md",
    type: "default",
    disabled: false,
    withTime: false,
  },
};

export const DateTimePicker: StoryObj<typeof DatePicker> = {
  args: {
    size: "md",
    disabled: false,
    withTime: true,
  },
};

export const RangePicker: StoryObj<typeof DatePicker> = {
  args: {
    size: "md",
    type: "range",
    disabled: false,
    withTime: false,
  },
};
