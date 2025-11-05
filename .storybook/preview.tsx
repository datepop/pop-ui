import React from 'react';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { PopUiProvider } from '../packages/core/src/theme/ThemeProvider';

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
      <PopUiProvider>
        <Story />
      </PopUiProvider>
    ),
  ],
};

export default preview;
