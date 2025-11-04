import React from 'react';

import { ThemeProvider } from '../packages/core/src/theme/ThemeProvider';
import '@mantine/core/styles.css';

import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
      storySort: (a, b) => (a.title === b.title ? 0 : a.id.localeCompare(b.id, { numeric: true })),
    },
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
