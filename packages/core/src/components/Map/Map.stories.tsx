import { expect } from 'storybook/test';


import { Map } from './index';
import { getMarkerHTML, markerStyles } from './markerStyles';
import {
  WidthComparison,
  checkComparisonWidth,
} from '../../../../../.storybook/examples/WidthComparison';

import type { IMapProps } from './types';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Map component requires Naver Cloud Platform Client ID.
 * Get your client ID at https://www.ncloud.com/product/applicationService/maps
 *
 * Usage:
 * ```tsx
 * <NaverMapProvider clientId="YOUR_NCP_CLIENT_ID">
 *   <Map
 *     options={{
 *       width: '100%',
 *       height: '400px',
 *       center: { lat: 37.5665, lng: 126.978 },
 *       zoom: 15,
 *     }}
 *     onLoad={(mapRef) => {
 *       // Add markers, pan, etc.
 *     }}
 *   />
 * </NaverMapProvider>
 * ```
 */
export default {
  title: 'Core/Map',
  component: Map,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
## Map Component

A wrapper component for Naver Maps. Requires \`NaverMapProvider\` as a parent.

### Prerequisites
- Naver Cloud Platform account
- Maps API Client ID from NCP Console

### Features
- Marker support (pin, popdeal, pi, cluster types)
- Marker clustering
- Pan, zoom controls
- Location tracking
        `,
      },
    },
  },
} satisfies Meta<typeof Map>;

// Note: Stories require a valid NCP Client ID to work
// Replace 'YOUR_NCP_CLIENT_ID' with actual client ID for testing

export const Default: StoryObj<IMapProps> = {
  render: () => (
    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
        Map requires Naver Cloud Platform Client ID to render.
        <br />
        Wrap with <code>&lt;NaverMapProvider clientId=&quot;...&quot;&gt;</code>
      </p>
      <div
        style={{
          width: '100%',
          height: '400px',
          background: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          color: '#888',
        }}
      >
        Map Preview (requires NCP Client ID)
      </div>
    </div>
  ),
};

export const WithMarker: StoryObj<IMapProps> = {
  render: () => {
    return (
      <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
        <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          Example usage with marker:
        </p>
        <pre
          style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto',
          }}
        >
          {`<NaverMapProvider clientId="YOUR_CLIENT_ID">
  <Map
    options={{
      width: '100%',
      height: '400px',
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 15,
    }}
    onLoad={(mapRef) => {
      mapRef.addMarker({
        id: 'marker-1',
        type: 'pi',
        position: { latitude: 37.5665, longitude: 126.978 },
        title: 'Seoul City Hall',
      });
    }}
  />
</NaverMapProvider>`}
        </pre>
      </div>
    );
  },
};

export const PriceMarkers: StoryObj<IMapProps> = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
      <style>{markerStyles}</style>
      {[
        { title: '서울시청', category: '카페' },
        { title: '서울시청', category: '카페', active: true },
        { title: '서울시청 근처에서 만나는 아주 긴 장소 이름', category: '브런치 카페' },
        { title: '서울시청' },
      ].map((example, index) => (
        <div key={index} style={{ position: 'relative', height: 150 }}>
          <div
            style={{ position: 'absolute', left: '50%', top: 130 }}
            dangerouslySetInnerHTML={{
              __html: getMarkerHTML({
                ...example,
                id: String(index),
                type: 'popdeal',
                position: { latitude: 37.5665, longitude: 126.978 },
                originalPrice: 15000,
                discountRate: 20,
                price: 12000,
              }),
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const ContentAtDifferentWidths: StoryObj<IMapProps> = {
  name: '너비별 콘텐츠',
  tags: ['pop-ui-contract'],
  parameters: { layout: 'padded' },
  play: async (context) => {
    for (const column of await checkComparisonWidth(context)) {
      const markers = column.querySelectorAll('.popdeal-marker');
      await expect(markers).toHaveLength(3);
      for (const marker of markers) {
        const title = marker.querySelector('.popdeal-marker-title')!;
        await expect(title.clientHeight).toBeLessThanOrEqual(
          Math.ceil(2 * parseFloat(getComputedStyle(title).lineHeight)),
        );
        const price = marker.querySelector('.popdeal-marker-discounted_price')!;
        const range = column.ownerDocument.createRange();
        range.selectNodeContents(price);
        await expect(range.getClientRects()).toHaveLength(1);
      }
      await expect(markers[2].querySelector('.popdeal-marker-category')).toBeNull();
    }
  },
  render: () => (
    <WidthComparison>
      <style>{markerStyles}</style>
      {[
        { title: '서울시청 근처에서 함께하는 주말 산책 모임', category: '브런치 카페' },
        { title: 'SeoulCityHallWeekendWalkingClub', category: 'Cafe' },
        { title: '서울시청' },
      ].map((example) => (
        <div
          key={example.title}
          className="pop-ui-map"
          style={{ position: 'relative', height: 128 }}
        >
          <div
            style={{ position: 'absolute', left: '50%', top: 114, width: 0 }}
            dangerouslySetInnerHTML={{
              __html: getMarkerHTML({
                id: example.title,
                type: 'popdeal',
                position: { latitude: 37.5665, longitude: 126.978 },
                ...example,
                price: 12000,
                originalPrice: 15000,
                discountRate: 20,
              }),
            }}
          />
        </div>
      ))}
    </WidthComparison>
  ),
};
