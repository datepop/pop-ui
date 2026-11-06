import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';

import sources from '../../../../docs/hotel-summary-assets.sources.json';
import { IconHotelFacilityOtt, IconHotelFooterFavorite } from '../icons';

it('retains the original off/on favorite paint without changing its geometry', () => {
  const off = renderToStaticMarkup(<IconHotelFooterFavorite />);
  const on = renderToStaticMarkup(<IconHotelFooterFavorite variant="filled" />);
  expect(off).toContain('fill-opacity="0.063"');
  expect(on).toContain('fill-opacity="1"');
  expect(off.match(/ d="[^"]+"/g)).toEqual(on.match(/ d="[^"]+"/g));
  expect(on).toContain('viewBox="0 0 18 17"');
});

it('keeps facility clip paths separate when several instances share a document', () => {
  const html = renderToStaticMarkup(
    <>
      <IconHotelFacilityOtt />
      <IconHotelFacilityOtt />
    </>,
  );
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
  expect(ids).toHaveLength(2);
  expect(new Set(ids).size).toBe(2);
  for (const id of ids) expect(html).toContain(`url(#${id})`);
});

it('ships the unmodified Android raster originals identified by the source inventory', () => {
  for (const name of ['favoriteOn', 'favoriteOff', 'mapSample']) {
    const source = sources.find((entry) => entry.export === `hotelSummaryImages.${name}`);
    const bytes = readFileSync(resolve('packages/foundation/src/hotel-summary', `${name}.webp`));
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(source?.sha256);
  }
});
