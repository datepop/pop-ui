import { ColorPalette } from './ColorPalette';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ColorPalette> = {
  title: 'Foundation/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const AllColors: Story = {
  render: () => <ColorPalette />,
};
