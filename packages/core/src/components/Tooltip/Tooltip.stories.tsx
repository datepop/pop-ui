import { Tooltip } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export const DefaultTooltip: StoryObj<typeof Tooltip> = {
  args: {
    title: "tooltip title",
    content:
      "tooltip content content content content content content content content content content content",
    maw: 220,
    multiline: true,
    position: "top",
    children: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 280,
          height: 50,
          background: "#e0e0e0",
          fontSize: 25,
        }}
      >
        hover me
      </div>
    ),
  },
};
