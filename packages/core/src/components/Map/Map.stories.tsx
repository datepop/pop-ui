import { Map } from './index';

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
