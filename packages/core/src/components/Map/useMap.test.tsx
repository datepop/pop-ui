import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const h = vi.hoisted(() => {
  const addListener = vi.fn();
  const markerEl = document.createElement('div');
  markerEl.innerHTML = '<div class="popdeal-marker" active="false"></div>';
  const markerInstance = { getElement: () => markerEl, setMap: vi.fn() };
  const MarkerCtor = vi.fn(function (_opts: { icon: { content: string } }) {
    return markerInstance;
  });
  const LatLngCtor = vi.fn(function (this: { lat: number; lng: number }, lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  });
  const naverStub = {
    maps: {
      Marker: MarkerCtor,
      LatLng: LatLngCtor,
      Event: { addListener },
      // used by the clustering effect once markers exist
      Size: vi.fn(),
      Point: vi.fn(),
    },
  };
  return { addListener, markerEl, markerInstance, MarkerCtor, LatLngCtor, naverStub };
});

vi.mock('./NaverMapContext', () => ({
  useNaverMap: () => ({ naver: h.naverStub }),
}));
vi.mock('./markerClustering', () => ({
  makeMarkerClustering: () =>
    vi.fn(function () {
      return { setMap: vi.fn() };
    }),
}));

import { getMarkerHTML } from './markerStyles';
import { useMap } from './useMap';

import type { IPopdealMarkerData } from './types';
import type { Root } from 'react-dom/client';

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

type TApi = ReturnType<typeof useMap>;

function Harness({ map, onReady }: { map: naver.maps.Map | null; onReady: (api: TApi) => void }) {
  const api = useMap(map);
  React.useEffect(() => {
    onReady(api);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div data-testid="out" />;
}

const popdeal = (id: string): IPopdealMarkerData => ({
  id,
  type: 'popdeal',
  position: { latitude: 37.5, longitude: 127.0 },
  title: 'Deal',
  price: 10000,
});

describe('useMap', () => {
  let container: HTMLElement;
  let root: Root;

  beforeEach(() => {
    vi.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    // reset the shared marker element for isolation
    h.markerEl.innerHTML = '<div class="popdeal-marker" active="false"></div>';
  });

  function mount(map: naver.maps.Map | null): TApi {
    let api!: TApi;
    act(() => {
      root.render(<Harness map={map} onReady={(a) => (api = a)} />);
    });
    return api;
  }

  it('addMarker with valid map+naver returns the marker and builds icon.content via getMarkerHTML', () => {
    const api = mount({} as naver.maps.Map);
    const data = popdeal('p1');

    let result: naver.maps.Marker | null = null;
    act(() => {
      result = api.addMarker(data);
    });

    expect(result).toBe(h.markerInstance);
    expect(h.MarkerCtor).toHaveBeenCalledTimes(1);
    const ctorArg = h.MarkerCtor.mock.calls[0]?.[0];
    expect(ctorArg.icon.content).toBe(getMarkerHTML(data));

    // registration observable via updateMarker working on the id
    act(() => {
      api.updateMarker('p1', { active: true });
    });
    const div = h.markerEl.querySelector('.popdeal-marker');
    expect(div?.getAttribute('active')).toBe('true');
  });

  it('addMarker with map=null returns null and does not construct a Marker', () => {
    const api = mount(null);
    let result: naver.maps.Marker | null = h.markerInstance as unknown as naver.maps.Marker;
    act(() => {
      result = api.addMarker(popdeal('p2'));
    });
    expect(result).toBeNull();
    expect(h.MarkerCtor).not.toHaveBeenCalled();
  });

  it('addMarker registers onClick via naver.maps.Event.addListener for click', () => {
    const api = mount({} as naver.maps.Map);
    act(() => {
      api.addMarker({ ...popdeal('p3'), onClick: vi.fn() });
    });
    expect(h.addListener).toHaveBeenCalledWith(h.markerInstance, 'click', expect.any(Function));
  });

  it('updateMarker toggles the active attribute on the .popdeal-marker div', () => {
    const api = mount({} as naver.maps.Map);
    act(() => {
      api.addMarker(popdeal('p4'));
    });
    const div = h.markerEl.querySelector('.popdeal-marker');

    act(() => {
      api.updateMarker('p4', { active: true });
    });
    expect(div?.getAttribute('active')).toBe('true');

    act(() => {
      api.updateMarker('p4', { active: false });
    });
    expect(div?.getAttribute('active')).toBe('false');
  });

  it('updateMarker on an unknown id is a no-op and does not throw', () => {
    const api = mount({} as naver.maps.Map);
    expect(() => {
      act(() => {
        api.updateMarker('does-not-exist', { active: true });
      });
    }).not.toThrow();
  });
});
