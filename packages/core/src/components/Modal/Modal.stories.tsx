import { Modal } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;

export const DefaultModal: StoryObj<typeof Modal> = {
  args: {
    children: "test",
    opened: true,
    centered: false,
  },
};
