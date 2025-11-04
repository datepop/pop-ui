import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test.setup.ts'],
    include: ['packages/*/src/**/*.test.{ts,tsx,js,jsx}'],
    exclude: ['node_modules', 'src/stories/assets/js/**', '**/dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'clover'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/**/stories.{js,jsx,ts,tsx}', 'src/stories/assets/js/**', 'src/types/**'],
    },
  },
});
