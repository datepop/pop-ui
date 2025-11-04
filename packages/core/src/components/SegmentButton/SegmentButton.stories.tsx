import { SegmentButton } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/SegmentButton",
  component: SegmentButton,
} satisfies Meta<typeof SegmentButton>;

export const DefaultSegmentButton: StoryObj<typeof SegmentButton> = {
  args: {
    data: ["data1", "data2", "data3"],
    size: "md",
    radius: 6,
    disabled: false,
  },
};
