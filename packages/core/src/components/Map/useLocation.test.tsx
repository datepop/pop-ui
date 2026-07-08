import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../Toast', () => ({ toast: vi.fn() }));

import { useLocation } from './useLocation';
import { toast } from '../Toast';

import type { ILocation } from './types';
import type { Root } from 'react-dom/client';

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

function Harness(props: Parameters<typeof useLocation>[0]) {
  const { position, isLoading, isError } = useLocation(props);
  return (
    <div
      data-testid="out"
      data-position={position === null ? 'null' : JSON.stringify(position)}
      data-loading={String(isLoading)}
      data-error={String(isError)}
    />
  );
}

interface IState {
  position: ILocation | null;
  isLoading: boolean;
  isError: boolean;
}

function readState(container: HTMLElement): IState {
  const el = container.querySelector('[data-testid="out"]') as HTMLElement;
  const pos = el.dataset.position;
  return {
    position: pos === 'null' ? null : (JSON.parse(pos ?? 'null') as ILocation),
    isLoading: el.dataset.loading === 'true',
    isError: el.dataset.error === 'true',
  };
}

const getCurrentPosition = vi.fn();

function render(props: Parameters<typeof useLocation>[0]) {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    root.render(<Harness {...props} />);
  });
  return { container, root };
}

function rerender(root: Root, props: Parameters<typeof useLocation>[0]) {
  act(() => {
    root.render(<Harness {...props} />);
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  getCurrentPosition.mockClear();
  vi.mocked(toast).mockClear();
});

function stubGeolocation() {
  vi.stubGlobal('navigator', { geolocation: { getCurrentPosition } });
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  });
}

describe('useLocation', () => {
  it('isActive=false 이면 getCurrentPosition을 호출하지 않는다', () => {
    stubGeolocation();
    const { container } = render({ isActive: false });

    expect(getCurrentPosition).not.toHaveBeenCalled();
    expect(readState(container).position).toBeNull();
    expect(readState(container).isError).toBe(false);
  });

  it('isActive=true success: coords로 position을 채운다', () => {
    stubGeolocation();
    const { container, root } = render({ isActive: true });

    expect(getCurrentPosition).toHaveBeenCalledTimes(1);

    const successCb = getCurrentPosition.mock.calls[0][0] as PositionCallback;
    act(() => {
      successCb({
        coords: { latitude: 37.5, longitude: 127.0 },
      } as GeolocationPosition);
    });

    expect(readState(container).position).toEqual({
      latitude: 37.5,
      longitude: 127.0,
    });
    expect(readState(container).isError).toBe(false);

    act(() => {
      root.unmount();
    });
  });

  it('isActive=true error: position null, isError true, toast 호출', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    stubGeolocation();
    const { container, root } = render({ isActive: true });

    const errorCb = getCurrentPosition.mock.calls[0][1] as PositionErrorCallback;
    act(() => {
      errorCb({
        code: 1,
        message: 'denied',
      } as GeolocationPositionError);
    });

    expect(readState(container).position).toBeNull();
    expect(readState(container).isError).toBe(true);
    expect(toast).toHaveBeenCalledTimes(1);

    const arg = vi.mocked(toast).mock.calls[0][0] as { message: string };
    expect(arg.message).toContain('위치 정보를 불러오는 데 실패했어요.');

    act(() => {
      root.unmount();
    });
    errorSpy.mockRestore();
  });

  it('single-flight: 콜백 해소 전 리렌더는 getCurrentPosition을 재호출하지 않는다', () => {
    stubGeolocation();
    const { root } = render({ isActive: true });

    expect(getCurrentPosition).toHaveBeenCalledTimes(1);

    // 콜백을 아직 발화하지 않은 상태 → isLoadingRef가 여전히 true
    rerender(root, { isActive: true });

    expect(getCurrentPosition).toHaveBeenCalledTimes(1);

    act(() => {
      root.unmount();
    });
  });
});
