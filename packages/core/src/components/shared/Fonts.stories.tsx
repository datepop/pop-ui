import './fonts/families.scss';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = { title: 'Core/Fonts' };
export default meta;
type TStory = StoryObj;

const families = [
  {
    name: 'Noto Sans KR',
    weights: [400, 500, 600, 700],
    sample: '가나다라마바사 · AaBbCc · 0123456789',
  },
  { name: 'Montserrat', weights: [500, 600, 700], sample: 'AaBbCc · 0123456789' },
];

export const ScopedFamilies: TStory = {
  name: 'Families',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {families.map(({ name, weights, sample }) => (
        <div key={name}>
          <h2>{name}</h2>
          {weights.map((weight) => (
            <p key={weight} style={{ fontFamily: name, fontWeight: weight }}>
              {weight} — {sample}
            </p>
          ))}
        </div>
      ))}
    </div>
  ),
};
