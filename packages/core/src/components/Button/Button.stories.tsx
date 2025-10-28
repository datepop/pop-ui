import { StoryFn, Meta } from "@storybook/react";
import { Button } from ".";
import type { IButtonProps } from "./type";

export default {
  title: "Core/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<IButtonProps> = (args) => <Button {...args} />;

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: "데이트팝 Button",
  styleType: "primary",
  size: "md",
  disabled: false,
};

export const PrimaryLineButton = Template.bind({});
PrimaryLineButton.args = {
  children: "데이트팝 Button",
  styleType: "primaryLine",
  size: "md",
  disabled: false,
};

export const BasicButton = Template.bind({});
BasicButton.args = {
  children: "데이트팝 Button",
  styleType: "basic",
  size: "md",
  disabled: false,
};

export const DangerButton = Template.bind({});
DangerButton.args = {
  children: "데이트팝 Button",
  styleType: "danger",
  size: "md",
  disabled: false,
};

export const SettingButton = Template.bind({});
SettingButton.args = {
  children: "데이트팝 Button",
  styleType: "setting",
  size: "md",
  disabled: false,
};
