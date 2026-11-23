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

export const ViewSelection: StoryObj<typeof SegmentButton> = {
  name: "보기 방식 선택",
  parameters: { layout: "centered" },
  args: { data: ["목록", "주변 지도"], defaultValue: "목록", size: "md" },
};
