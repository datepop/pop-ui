import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

let mockNaverClientId: string | undefined;
const mockMapOptions: Record<string, unknown>[] = [];

vi.mock('../Map', () => ({
  Map: ({ options }: { options?: Record<string, unknown> }) => {
    if (options) mockMapOptions.push(options);
    return <div data-testid="map" />;
  },
  NaverMapProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../Button', () => ({
  Button: ({ children }: { children?: React.ReactNode }) => <button>{children}</button>,
}));

vi.mock('../../theme', () => ({
  usePopUIConfig: () => ({ naverClientId: mockNaverClientId }),
}));

const mockToast = vi.fn();
vi.mock('../Toast', () => ({
  toast: (message: string) => mockToast(message),
}));

vi.mock('@pop-ui/foundation', () => ({
  IconMap: () => <span />,
  IconMapMarker: () => <span />,
  ColorAqua500: '#0fd3d8',
  ColorGray800: '#333',
}));

import { MapInfo } from '.';
import styles from './styles.module.scss';

import type { IMapInfoProps } from './types';
import type { Root } from 'react-dom/client';

interface IRenderedApp {
  container: HTMLDivElement;
  root: Root;
}

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const renderApp = (ui: React.ReactNode): IRenderedApp => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
};

const cleanupRenderedApp = ({ container, root }: IRenderedApp): void => {
  act(() => {
    root.unmount();
  });

  container.remove();
};

const location: IMapInfoProps['location'] = {
  title: '스타벅스',
  address: '서울시 강남구 테헤란로 123',
  latitude: 37.5,
  longitude: 127.0,
};

describe('MapInfo', () => {
  afterEach(() => {
    mockToast.mockClear();
    mockMapOptions.length = 0;
    mockNaverClientId = undefined;
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  it('renders the NoClientId guidance and no map when naverClientId is missing', () => {
    const view = renderApp(<MapInfo location={location} />);

    const noClientId = view.container.querySelector(`.${styles.MapInfo__NoClientId}`);
    expect(noClientId).not.toBeNull();
    expect(noClientId?.textContent).toContain('naverClientId');
    expect(view.container.querySelector('[data-testid="map"]')).toBeNull();

    cleanupRenderedApp(view);
  });

  it('builds the default direction href from the location title', () => {
    const view = renderApp(<MapInfo location={location} naverClientId="test-id" />);

    const link = view.container.querySelector(`.${styles.MapInfo__DirectionLink}`);
    expect(link?.getAttribute('href')).toBe(
      `https://map.naver.com/p/search/${encodeURIComponent('스타벅스')}`,
    );

    cleanupRenderedApp(view);
  });

  it('uses an explicit direction url when provided', () => {
    const view = renderApp(
      <MapInfo location={location} naverClientId="test-id" direction={{ url: 'https://custom' }} />,
    );

    const link = view.container.querySelector(`.${styles.MapInfo__DirectionLink}`);
    expect(link?.getAttribute('href')).toBe('https://custom');

    cleanupRenderedApp(view);
  });

  it('renders the default direction label', () => {
    const view = renderApp(<MapInfo location={location} naverClientId="test-id" />);

    const link = view.container.querySelector(`.${styles.MapInfo__DirectionLink}`);
    expect(link?.textContent).toContain('길찾기');

    cleanupRenderedApp(view);
  });

  it('copies the address and shows the default toast when the address is clicked', () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    const view = renderApp(<MapInfo location={location} naverClientId="test-id" />);

    const address = view.container.querySelector(`.${styles.MapInfo__Address}`) as HTMLElement;

    act(() => {
      address.click();
    });

    expect(writeText).toHaveBeenCalledWith(location.address);
    expect(mockToast).toHaveBeenCalledWith('주소 복사 완료');

    cleanupRenderedApp(view);
  });

  it('uses a custom addressCopied toast message when provided', () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    const view = renderApp(
      <MapInfo location={location} naverClientId="test-id" toast={{ addressCopied: '복사됨!' }} />,
    );

    const address = view.container.querySelector(`.${styles.MapInfo__Address}`) as HTMLElement;

    act(() => {
      address.click();
    });

    expect(writeText).toHaveBeenCalledWith(location.address);
    expect(mockToast).toHaveBeenCalledWith('복사됨!');

    cleanupRenderedApp(view);
  });

  it('subtracts the address bar height to compute the map preview height', () => {
    const view = renderApp(<MapInfo location={location} naverClientId="test-id" height={300} />);

    expect(mockMapOptions[0]?.height).toBe('240px');

    cleanupRenderedApp(view);
  });
});
