import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// ─── Hoisted mock factories ───────────────────────────────────────────────────

const { mockDropzone } = vi.hoisted(() => {
  const spy = vi.fn(
    ({
      children,
      className,
      style,
      disabled,
    }: {
      children: React.ReactNode;
      onDrop: (files: File[]) => void;
      className?: string;
      style?: React.CSSProperties;
      disabled?: boolean;
    }) => (
      <div
        data-testid="dropzone"
        data-disabled={String(!!disabled)}
        className={className}
        style={style}
      >
        {children}
      </div>
    ),
  );
  return { mockDropzone: spy };
});

// ─── Module mocks ─────────────────────────────────────────────────────────────

vi.mock('@mantine/dropzone', () => ({
  Dropzone: (props: Parameters<typeof mockDropzone>[0]) => mockDropzone(props),
}));

vi.mock('@mantine/core', () => ({
  Input: {
    Error: ({ children }: { children: React.ReactNode; mt?: number }) => (
      <div data-testid="input-error">{children}</div>
    ),
  },
  Loader: ({ size: _size, color: _color }: { size?: number; color?: string }) => (
    <div data-testid="loader" />
  ),
}));

vi.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  PointerSensor: class {},
  KeyboardSensor: class {},
  closestCenter: vi.fn(),
  useSensor: vi.fn(),
  useSensors: vi.fn(() => []),
}));

vi.mock('@dnd-kit/sortable', () => ({
  SortableContext: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  rectSortingStrategy: vi.fn(),
  sortableKeyboardCoordinates: vi.fn(),
  useSortable: vi.fn(() => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: undefined,
    isDragging: false,
  })),
}));

vi.mock('@dnd-kit/utilities', () => ({
  CSS: { Transform: { toString: () => '' } },
}));

vi.mock('@pop-ui/foundation', () => ({
  IconPhoto: () => <div data-testid="icon-photo" />,
  IconXCircle: () => <div data-testid="icon-xcircle" />,
  IconDragMenu: () => <div data-testid="icon-drag" />,
  ColorAqua500: '#07a3c6',
}));

vi.mock('lottie-react', () => ({
  default: ({
    animationData: _data,
  }: {
    animationData: unknown;
    loop?: boolean;
    autoplay?: boolean;
    style?: React.CSSProperties;
  }) => <div data-testid="lottie-player" />,
}));

vi.mock('../Toast', () => ({
  toast: vi.fn(),
}));

import { LottieInput } from '.';
import { toast } from '../Toast';

import type { LottieInputItem } from './types';
import type { Root } from 'react-dom/client';

// ─── Helpers ──────────────────────────────────────────────────────────────────

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

interface IRenderedApp {
  container: HTMLDivElement;
  root: Root;
}

const renderApp = (ui: React.ReactNode): IRenderedApp => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(ui));
  return { container, root };
};

const cleanupRenderedApp = ({ container, root }: IRenderedApp) => {
  act(() => root.unmount());
  container.remove();
};

const VALID_LOTTIE = { v: '5', fr: 30, ip: 0, op: 60, w: 400, h: 400, layers: [] };

const makeItem = (id: string, overrides: Partial<LottieInputItem> = {}): LottieInputItem => ({
  id,
  animationData: VALID_LOTTIE,
  ...overrides,
});

const makeLottieFile = (name = 'anim.json', valid = true) => {
  const content = valid ? JSON.stringify(VALID_LOTTIE) : '{"bad": "data"}';
  return new File([content], name, { type: 'application/json' });
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('LottieInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    mockDropzone.mockClear();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  // ─── render ────────────────────────────────────────────────────────────────

  describe('render', () => {
    it('empty value → one placeholder dropzone', () => {
      const view = renderApp(<LottieInput value={[]} />);
      expect(view.container.querySelectorAll('[data-testid="dropzone"]')).toHaveLength(1);
      cleanupRenderedApp(view);
    });

    it('renders lottie player for items with animationData', () => {
      const view = renderApp(<LottieInput value={[makeItem('a'), makeItem('b')]} />);
      expect(view.container.querySelectorAll('[data-testid="lottie-player"]')).toHaveLength(2);
      cleanupRenderedApp(view);
    });

    it('readOnly hides delete buttons and dropzones', () => {
      const view = renderApp(<LottieInput value={[makeItem('a')]} readOnly />);
      expect(view.container.querySelector('[aria-label="Lottie 삭제"]')).toBeNull();
      expect(view.container.querySelector('[data-testid="dropzone"]')).toBeNull();
      cleanupRenderedApp(view);
    });

    it('errorMsg renders Input.Error', () => {
      const view = renderApp(<LottieInput value={[]} errorMsg="파일을 추가하세요" />);
      expect(view.container.querySelector('[data-testid="input-error"]')).toHaveTextContent(
        '파일을 추가하세요',
      );
      cleanupRenderedApp(view);
    });

    it('maxLength=2, 2 items → 0 placeholders', () => {
      const view = renderApp(<LottieInput value={[makeItem('a'), makeItem('b')]} maxLength={2} />);
      expect(view.container.querySelector('[data-testid="dropzone"]')).toBeNull();
      cleanupRenderedApp(view);
    });
  });

  // ─── onChange: create ──────────────────────────────────────────────────────

  describe('onChange: create', () => {
    it('dropping a valid lottie file calls onChange with action: create', async () => {
      const onChange = vi.fn();
      const view = renderApp(<LottieInput value={[]} onChange={onChange} />);

      const onDrop = mockDropzone.mock.calls[0]?.[0].onDrop;
      await act(async () => {
        await onDrop([makeLottieFile('a.json', true)]);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      const [nextValue, meta] = onChange.mock.calls[0];
      expect(nextValue).toHaveLength(1);
      expect(meta).toMatchObject({ action: 'create', index: 0 });
      cleanupRenderedApp(view);
    });

    it('dropping invalid file shows toast, no onChange', async () => {
      const onChange = vi.fn();
      const view = renderApp(<LottieInput value={[]} onChange={onChange} />);

      const onDrop = mockDropzone.mock.calls[0]?.[0].onDrop;
      await act(async () => {
        await onDrop([makeLottieFile('bad.json', false)]);
      });

      expect(onChange).not.toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ id: 'invalid-lottie-files' }));
      cleanupRenderedApp(view);
    });

    it('mixed valid/invalid files: valid added, toast for invalid count', async () => {
      const onChange = vi.fn();
      const view = renderApp(<LottieInput value={[]} onChange={onChange} />);

      const onDrop = mockDropzone.mock.calls[0]?.[0].onDrop;
      await act(async () => {
        await onDrop([makeLottieFile('a.json', true), makeLottieFile('bad.json', false)]);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toHaveLength(1);
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({ message: '유효하지 않은 Lottie JSON 파일입니다' }),
      );
      cleanupRenderedApp(view);
    });
  });

  // ─── onChange: delete ──────────────────────────────────────────────────────

  describe('onChange: delete', () => {
    it('delete button click → action: delete', () => {
      const onChange = vi.fn();
      const view = renderApp(<LottieInput value={[makeItem('a')]} onChange={onChange} />);

      act(() => {
        view.container
          .querySelector('[aria-label="Lottie 삭제"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(onChange).toHaveBeenCalledWith([], { action: 'delete', itemId: 'a', index: 0 });
      cleanupRenderedApp(view);
    });

    it('delete in readOnly → no onChange', () => {
      const onChange = vi.fn();
      const view = renderApp(<LottieInput value={[makeItem('a')]} readOnly onChange={onChange} />);
      expect(view.container.querySelector('[aria-label="Lottie 삭제"]')).toBeNull();
      expect(onChange).not.toHaveBeenCalled();
      cleanupRenderedApp(view);
    });
  });
});
