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
  IMAGE_MIME_TYPE: ['image/jpeg', 'image/png'],
}));

vi.mock('@mantine/core', () => ({
  Input: {
    Error: ({ children }: { children: React.ReactNode; mt?: number }) => (
      <div data-testid="input-error">{children}</div>
    ),
  },
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
}));

vi.mock('../Button', () => ({
  Button: ({
    children,
    onClick,
    className,
    isLoading: _isLoading,
    variant: _variant,
    size: _size,
    ...rest
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: string;
    size?: string;
    isLoading?: boolean;
    [key: string]: unknown;
  }) => (
    <button type="button" className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  ),
}));

vi.mock('./ImageInputCropModal', () => ({
  ImageInputCropModal: ({
    isOpen,
    onClose,
    onSubmit,
  }: {
    isOpen: boolean;
    item: unknown;
    onClose: () => void;
    onSubmit: (file: File) => void;
  }) =>
    isOpen ? (
      <div data-testid="crop-modal">
        <button data-testid="crop-cancel" onClick={onClose}>
          취소
        </button>
        <button
          data-testid="crop-submit"
          onClick={() => onSubmit(new File(['data'], 'cropped.jpg', { type: 'image/jpeg' }))}
        >
          적용하기
        </button>
      </div>
    ) : null,
}));

import { ImageInput } from '.';

import type { ImageInputItem } from './types';
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

const makeItem = (id: string, url = `blob:mock/${id}`): ImageInputItem => ({ id, url });

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ImageInput', () => {
  beforeEach(() => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock/new');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
  });

  afterEach(() => {
    mockDropzone.mockClear();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  // ─── render ────────────────────────────────────────────────────────────────

  describe('render', () => {
    it('empty value → one placeholder dropzone', () => {
      const view = renderApp(<ImageInput value={[]} />);
      expect(view.container.querySelectorAll('[data-testid="dropzone"]')).toHaveLength(1);
      cleanupRenderedApp(view);
    });

    it('renders one img per item', () => {
      const view = renderApp(<ImageInput value={[makeItem('a'), makeItem('b')]} />);
      expect(view.container.querySelectorAll('img')).toHaveLength(2);
      cleanupRenderedApp(view);
    });

    it('readOnly hides delete buttons, drag handles, and dropzones', () => {
      const view = renderApp(<ImageInput value={[makeItem('a')]} readOnly />);
      expect(view.container.querySelector('[aria-label="이미지 삭제"]')).toBeNull();
      expect(view.container.querySelector('[aria-label="드래그로 순서 변경"]')).toBeNull();
      expect(view.container.querySelector('[data-testid="dropzone"]')).toBeNull();
      cleanupRenderedApp(view);
    });

    it('errorMsg renders Input.Error', () => {
      const view = renderApp(<ImageInput value={[]} errorMsg="이미지를 추가하세요" />);
      expect(view.container.querySelector('[data-testid="input-error"]')).toHaveTextContent(
        '이미지를 추가하세요',
      );
      cleanupRenderedApp(view);
    });

    it('hasEdit=true shows edit buttons on tiles', () => {
      const view = renderApp(<ImageInput value={[makeItem('a')]} hasEdit />);
      expect(view.container.querySelector('[aria-label="이미지 편집"]')).not.toBeNull();
      cleanupRenderedApp(view);
    });

    it('hasEdit=false hides edit buttons', () => {
      const view = renderApp(<ImageInput value={[makeItem('a')]} hasEdit={false} />);
      expect(view.container.querySelector('[aria-label="이미지 편집"]')).toBeNull();
      cleanupRenderedApp(view);
    });
  });

  // ─── placeholder count ─────────────────────────────────────────────────────

  describe('placeholder count', () => {
    it('minLength=3, 2 items → 1 placeholder', () => {
      const view = renderApp(<ImageInput value={[makeItem('a'), makeItem('b')]} minLength={3} />);
      expect(view.container.querySelectorAll('[data-testid="dropzone"]')).toHaveLength(1);
      cleanupRenderedApp(view);
    });

    it('maxLength=2, 2 items → 0 placeholders', () => {
      const view = renderApp(<ImageInput value={[makeItem('a'), makeItem('b')]} maxLength={2} />);
      expect(view.container.querySelector('[data-testid="dropzone"]')).toBeNull();
      cleanupRenderedApp(view);
    });
  });

  // ─── onChange ──────────────────────────────────────────────────────────────

  describe('onChange', () => {
    it('file drop on placeholder → action: create', () => {
      const onChange = vi.fn();
      const view = renderApp(<ImageInput value={[]} onChange={onChange} />);

      const onDrop = mockDropzone.mock.calls[0]?.[0].onDrop;
      act(() => onDrop([new File(['data'], 'new.jpg', { type: 'image/jpeg' })]));

      expect(onChange).toHaveBeenCalledTimes(1);
      const [nextValue, meta] = onChange.mock.calls[0];
      expect(nextValue).toHaveLength(1);
      expect(meta).toMatchObject({ action: 'create', index: 0 });
      cleanupRenderedApp(view);
    });

    it('drop when already at maxLength → no onChange', () => {
      const onChange = vi.fn();
      const view = renderApp(
        <ImageInput value={[makeItem('a'), makeItem('b')]} maxLength={2} onChange={onChange} />,
      );
      // no placeholders rendered → no dropzone to interact with
      expect(view.container.querySelector('[data-testid="dropzone"]')).toBeNull();
      expect(onChange).not.toHaveBeenCalled();
      cleanupRenderedApp(view);
    });

    it('delete button click → action: delete', () => {
      const onChange = vi.fn();
      const view = renderApp(
        <ImageInput value={[makeItem('a', 'blob:mock/a')]} onChange={onChange} />,
      );

      act(() => {
        view.container
          .querySelector('[aria-label="이미지 삭제"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(onChange).toHaveBeenCalledWith([], { action: 'delete', itemId: 'a', index: 0 });
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock/a');
      cleanupRenderedApp(view);
    });

    it('delete in readOnly → no onChange', () => {
      const onChange = vi.fn();
      const view = renderApp(<ImageInput value={[makeItem('a')]} readOnly onChange={onChange} />);
      expect(view.container.querySelector('[aria-label="이미지 삭제"]')).toBeNull();
      expect(onChange).not.toHaveBeenCalled();
      cleanupRenderedApp(view);
    });
  });

  // ─── crop modal ────────────────────────────────────────────────────────────

  describe('crop modal', () => {
    it('edit button opens crop modal', () => {
      const view = renderApp(<ImageInput value={[makeItem('a')]} hasEdit />);

      expect(view.container.querySelector('[data-testid="crop-modal"]')).toBeNull();

      act(() => {
        view.container
          .querySelector('[aria-label="이미지 편집"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(view.container.querySelector('[data-testid="crop-modal"]')).not.toBeNull();
      cleanupRenderedApp(view);
    });

    it('crop confirm → action: crop, id preserved', () => {
      const onChange = vi.fn();
      const view = renderApp(
        <ImageInput value={[makeItem('a', 'blob:mock/a')]} hasEdit onChange={onChange} />,
      );

      act(() => {
        view.container
          .querySelector('[aria-label="이미지 편집"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      act(() => {
        view.container
          .querySelector('[data-testid="crop-submit"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      const [nextValue, meta] = onChange.mock.calls[0];
      expect(nextValue[0].id).toBe('a');
      expect(meta).toMatchObject({ action: 'crop', itemId: 'a', index: 0 });
      cleanupRenderedApp(view);
    });

    it('crop cancel closes modal without onChange', () => {
      const onChange = vi.fn();
      const view = renderApp(<ImageInput value={[makeItem('a')]} hasEdit onChange={onChange} />);

      act(() => {
        view.container
          .querySelector('[aria-label="이미지 편집"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      act(() => {
        view.container
          .querySelector('[data-testid="crop-cancel"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(view.container.querySelector('[data-testid="crop-modal"]')).toBeNull();
      expect(onChange).not.toHaveBeenCalled();
      cleanupRenderedApp(view);
    });
  });
});
