import { dirname } from 'node:path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-links'), getAbsolutePath('@storybook/addon-themes')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  async viteFinal(config) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@pop-ui/foundation': path.resolve(__dirname, '../packages/foundation/src/index.ts'),
      '@pop-ui/core': path.resolve(__dirname, '../packages/core/src/index.ts'),
      '@pop-ui/chart': path.resolve(__dirname, '../packages/chart/src/index.ts'),
    };
    return config;
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
