import './font.css';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = { title: 'Core/Hotel Fonts' };
export default meta;
type TStory = StoryObj;

export const ScopedFamilies: TStory = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <p>Scoped hotel font families. Consumer global fonts remain unchanged.</p>
      {['Pop UI Hotel Noto Sans KR', 'Pop UI Hotel Montserrat'].map((family) => (
        <div key={family}>
          <h2>{family}</h2>
          {(family.includes('Noto') ? [400, 500, 600, 700] : [500, 600, 700]).map((weight) => (
            <p key={weight} style={{ fontFamily: family, fontWeight: weight }}>
              {weight} — 호텔 예약 · 123,456원 · Hotel Summary
            </p>
          ))}
        </div>
      ))}
    </div>
  ),
};
