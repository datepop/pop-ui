import { foundationImages } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = { title: 'Foundation/Images' };
export default meta;

export const Catalog: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap: 24 }}>
      {Object.entries(foundationImages).map(([name, url]) => (
        <figure key={name} style={{ margin: 0 }}>
          <img src={url} alt={name} style={{ maxWidth: 180, maxHeight: 120 }} />
          <figcaption>{name}</figcaption>
        </figure>
      ))}
    </div>
  ),
};
