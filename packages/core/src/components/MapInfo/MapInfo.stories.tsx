import { MapInfo } from './index';

import type { IMapInfoProps } from './types';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Default test data
const TEST_DATA = {
  address: '서울특별시 중구 충무로 54-17 5층',
  latitude: 37.566039,
  longitude: 126.99342,
  shopTitle: '데이트팝 오피스',
};

/**
 * MapInfo component displays a map preview with address and directions.
 * Requires Naver Cloud Platform Client ID via PopUiProvider or props.
 */
export default {
  title: 'Core/MapInfo',
  component: MapInfo,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    naverClientId: '',
    address: TEST_DATA.address,
    latitude: TEST_DATA.latitude,
    longitude: TEST_DATA.longitude,
    shopTitle: TEST_DATA.shopTitle,
    height: 200,
  },
  argTypes: {
    naverClientId: {
      control: 'text',
      description: 'Naver Client ID (PopUiProvider에서 설정하거나 직접 전달)',
    },
    address: {
      control: 'text',
    },
    latitude: {
      control: 'number',
    },
    longitude: {
      control: 'number',
    },
    shopTitle: {
      control: 'text',
    },
    height: {
      control: 'number',
    },
    directionLabel: {
      control: 'text',
    },
    addressCopiedMessage: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## MapInfo Component

A compact map information card showing:
- Map preview (140px)
- Address with copy-to-clipboard
- Direction link to Naver Map

### Prerequisites
- Naver Cloud Platform account
- Maps API Client ID from NCP Console

### Usage (with Provider)
\`\`\`tsx
// App root
<PopUiProvider naverClientId="YOUR_NCP_CLIENT_ID">
  <App />
</PopUiProvider>

// Component - no need to pass naverClientId
<MapInfo
  address="서울특별시 중구 충무로 54-17 5층"
  latitude={37.566039}
  longitude={126.993420}
  shopTitle="데이트팝 오피스"
/>
\`\`\`

### Usage (with props)
\`\`\`tsx
<MapInfo
  naverClientId="YOUR_NCP_CLIENT_ID"
  address="서울특별시 중구 충무로 54-17 5층"
  latitude={37.566039}
  longitude={126.993420}
  shopTitle="데이트팝 오피스"
/>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof MapInfo>;

export const Default: StoryObj<IMapInfoProps> = {
  render: (args) => (
    <MapInfo
      {...args}
      onExpandRequest={() => {
        alert('지도 확장 요청! (onExpandRequest 호출됨)');
      }}
    />
  ),
};

export const CustomHeight: StoryObj<IMapInfoProps> = {
  args: {
    height: 300,
  },
  render: (args) => <MapInfo {...args} onExpandRequest={() => console.log('Expand map')} />,
};
