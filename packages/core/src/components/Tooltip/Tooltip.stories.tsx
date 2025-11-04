import { Tooltip } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/Tooltip",
  component: Tooltip,
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const defaultTooltip = Template.bind({});
defaultTooltip.args = {
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
};
