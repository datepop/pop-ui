import { StoryFn, Meta } from "@storybook/react";
import { Button } from ".";

export default {
  title: "Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const FilledButton = Template.bind({});
FilledButton.args = {
  children: "데이트팝 Button",
  variant: "filled",
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
  children: "데이트팝 Button",
  variant: "outline",
};

export const LightButton = Template.bind({});
LightButton.args = {
  children: "데이트팝 Button",
  variant: "light",
};
