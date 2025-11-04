import { Modal } from ".";

import type { StoryFn, Meta } from "@storybook/react";


export default {
  title: "Core/Modal",
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  children: "test",
  opened: true,
  centered: false,
};
