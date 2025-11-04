import { SegmentButton } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/SegmentButton",
  component: SegmentButton,
} as Meta<typeof SegmentButton>;

const Template: StoryFn<typeof SegmentButton> = (args) => (
  <SegmentButton {...args} />
);

export const defaultSegmentButton = Template.bind({});
defaultSegmentButton.args = {
  data: ["data1", "data2", "data3"],
  size: "md",
  radius: 6,
  disabled: false,
};
