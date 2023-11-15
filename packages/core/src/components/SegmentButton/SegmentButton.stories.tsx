import { StoryFn, Meta } from "@storybook/react";
import { SegmentButton } from ".";

export default {
  title: "Core/SegmentButton",
  component: SegmentButton,
} as Meta<typeof SegmentButton>;

const Template: StoryFn<typeof SegmentButton> = (args) => (
  <SegmentButton {...args} />
);

export const defaultRadio = Template.bind({});
defaultRadio.args = {
  data: ["data1", "data2", "data3"],
  size: "md",
  radius: 6,
  disabled: false,
};
