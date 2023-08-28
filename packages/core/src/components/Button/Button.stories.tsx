import { StoryFn, Meta } from "@storybook/react";
import { Button } from ".";

export default {
  title: "Core/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: "데이트팝 Button",
};
