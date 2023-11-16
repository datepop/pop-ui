import { StoryFn, Meta } from "@storybook/react";
import { Modal } from ".";

export default {
  title: "Core/Modal",
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const defaultModal = Template.bind({});
defaultModal.args = {
  children: "test",
  opened: true,
  centered: false,
};
