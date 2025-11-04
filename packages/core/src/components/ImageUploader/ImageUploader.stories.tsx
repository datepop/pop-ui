import { ImageUploader } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/ImageUploader",
  component: ImageUploader,
} satisfies Meta<typeof ImageUploader>;

export const DefaultImageUploader: StoryObj<typeof ImageUploader> = {
  args: {},
};
