import { StoryFn, Meta } from "@storybook/react";
import { ImageUploader } from ".";

export default {
  title: "Core/ImageUploader",
  component: ImageUploader,
} as Meta<typeof ImageUploader>;

const Template: StoryFn<typeof ImageUploader> = (args) => (
  <ImageUploader {...args} />
);

export const defaultImageUploader = Template.bind({});
defaultImageUploader.args = {};
