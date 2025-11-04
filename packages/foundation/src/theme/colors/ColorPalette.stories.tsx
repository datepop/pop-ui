import { ColorPalette } from './ColorPalette';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ColorPalette> = {
  title: 'Foundation/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type TStory = StoryObj<typeof ColorPalette>;

export const AllColors: TStory = {
  render: () => <ColorPalette />,
};
