import { StoryFn, Meta } from "@storybook/react";
import { Flex } from ".";

export default {
  title: "Flex",
  component: Flex,
} as Meta<typeof Flex>;

const Template: StoryFn<typeof Flex> = (args) => <Flex {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  children: "데이트팝 Flex",
};
