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
  Loader: () => <div data-testid="loader" />,
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
  IconPhoto: () => <div data-testid="icon-image" />,
  IconOpenInFull: () => <svg data-testid="preview-icon" />,
  IconEdit: () => <svg data-testid="edit-icon" />,
  IconXCircle: () => <div data-testid="icon-xcircle" />,
  IconDragMenu: () => <div data-testid="icon-drag" />,
  IconX: () => <svg data-testid="icon-x" />,
  ColorGray900: '#333333',
  ColorGray600: '#808080',
  ColorRed700: '#e03131',
  ColorAqua700: '#07a3c6',
  ColorAqua500: '#0fd3d8',
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

vi.mock('../Modal', () => ({
  Modal: ({
    opened,
    title,
    onClose,
    closeButtonProps,
    children,
  }: {
    opened: boolean;
    title: string;
    onClose: () => void;
    closeButtonProps?: { 'aria-label'?: string };
    children: React.ReactNode;
  }) =>
    opened ? (
      <div data-testid="preview-modal" aria-label={title}>
        <button
          data-testid="preview-close"
          aria-label={closeButtonProps?.['aria-label']}
          onClick={onClose}
        />
        {children}
      </div>
    ) : null,
}));

import { ImageInput } from '.';

import type { IImageInputItem } from './types';
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

const makeItem = (id: string, url = `blob:mock/${id}`): IImageInputItem => ({ id, url });

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

    it('renders a keyboard-accessible icon preview action in readOnly mode', () => {
      const view = renderApp(
        <ImageInput
          value={[makeItem('saved', 'https://cdn.example.test/image.jpg'), { id: 'missing' }]}
          readOnly
        />,
      );
      const previewButton =
        view.container.querySelector<HTMLButtonElement>('[aria-label="이미지 확대보기"]');
      expect(previewButton).not.toBeNull();
      expect(previewButton).toHaveAttribute('title', '크게 보기');
      expect(previewButton).toHaveTextContent('');
      expect(previewButton?.querySelector('[data-testid="preview-icon"]')).not.toBeNull();
      expect(previewButton?.tabIndex).toBe(0);
      expect(previewButton?.parentElement).toBe(view.container.querySelector('img')?.parentElement);
      act(() => previewButton?.focus());
      expect(document.activeElement).toBe(previewButton);
      expect(view.container.querySelectorAll('[aria-label="이미지 확대보기"]')).toHaveLength(1);
      act(() => {
        previewButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(view.container.querySelector('[data-testid="preview-modal"]')).not.toBeNull();
      expect(view.container.querySelector('[data-testid="preview-close"]')).toHaveAttribute(
        'aria-label',
        '이미지 미리보기 닫기',
      );
      cleanupRenderedApp(view);
    });

    it('does not open the replacement picker when the preview action is clicked', () => {
      const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});
      const view = renderApp(<ImageInput value={[makeItem('a')]} />);
      act(() => {
        view.container
          .querySelector('[aria-label="이미지 확대보기"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(clickSpy).not.toHaveBeenCalled();
      expect(view.container.querySelector('[data-testid="preview-modal"]')).not.toBeNull();
      cleanupRenderedApp(view);
    });

    it('keeps tile click wired to replacement selection', () => {
      const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});
      const view = renderApp(<ImageInput value={[makeItem('a')]} />);
      act(() => {
        view.container
          .querySelector('img')
          ?.parentElement?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(view.container.querySelector('[data-testid="preview-modal"]')).toBeNull();
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

    it('shows a keyboard-accessible edit icon on tiles when hasEdit is enabled', () => {
      const view = renderApp(<ImageInput value={[makeItem('a')]} hasEdit />);
      const editButton =
        view.container.querySelector<HTMLButtonElement>('[aria-label="이미지 편집"]');
      expect(editButton).not.toBeNull();
      expect(editButton).toHaveAttribute('title', '편집');
      expect(editButton).toHaveTextContent('');
      expect(editButton?.querySelector('[data-testid="edit-icon"]')).not.toBeNull();
      expect(editButton?.parentElement).toBe(view.container.querySelector('img')?.parentElement);
      expect(editButton?.tabIndex).toBe(0);
      cleanupRenderedApp(view);
    });

    it('hasEdit=false hides edit buttons', () => {
      const view = renderApp(<ImageInput value={[makeItem('a')]} hasEdit={false} />);
      expect(view.container.querySelector('[aria-label="이미지 편집"]')).toBeNull();
      cleanupRenderedApp(view);
    });

    it('hides the edit icon in readOnly mode', () => {
      const view = renderApp(<ImageInput value={[makeItem('a')]} hasEdit readOnly />);
      expect(view.container.querySelector('[aria-label="이미지 편집"]')).toBeNull();
      cleanupRenderedApp(view);
    });
  });

  describe('image preview', () => {
    it('opens from the explicit action and toggles fit and original size without changing value', () => {
      const onChange = vi.fn();
      const view = renderApp(
        <ImageInput value={[makeItem('a', 'blob:mock/a')]} onChange={onChange} />,
      );

      act(() => {
        view.container
          .querySelector('[aria-label="이미지 확대보기"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(view.container.querySelector('[data-testid="preview-modal"]')).not.toBeNull();
      expect(
        view.container.querySelector('[data-testid="preview-modal"] img')?.getAttribute('src'),
      ).toBe('blob:mock/a');
      expect(view.container.querySelector('[aria-label="화면에 맞춤"]')).toHaveAttribute(
        'aria-pressed',
        'true',
      );

      act(() => {
        view.container
          .querySelector('[aria-label="원본 크기 (100%)"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(view.container.querySelector('[aria-label="원본 크기 (100%)"]')).toHaveAttribute(
        'aria-pressed',
        'true',
      );
      expect(view.container.querySelector('[data-size-mode="original"]')).not.toBeNull();
      expect(onChange).not.toHaveBeenCalled();

      act(() => {
        view.container
          .querySelector('[data-testid="preview-close"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(view.container.querySelector('[data-testid="preview-modal"]')).toBeNull();
      expect(onChange).not.toHaveBeenCalled();
      cleanupRenderedApp(view);
    });

    it('supports position mode and closes when the controlled value removes the previewed item', () => {
      const view = renderApp(
        <ImageInput
          value={[{ ...makeItem('a', 'https://cdn.example.test/a.jpg'), position: 1 }]}
          length={3}
        />,
      );
      act(() => {
        view.container
          .querySelector('[aria-label="이미지 확대보기"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(view.container.querySelector('[data-testid="preview-modal"]')).not.toBeNull();

      act(() => view.root.render(<ImageInput value={[]} length={3} />));
      expect(view.container.querySelector('[data-testid="preview-modal"]')).toBeNull();
      cleanupRenderedApp(view);
    });

    it('keeps preview open for cloned items but closes when the selected source changes', () => {
      const item = makeItem('a', 'https://cdn.example.test/a.jpg');
      const view = renderApp(<ImageInput value={[item]} />);
      act(() => {
        view.container
          .querySelector('[aria-label="이미지 확대보기"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      act(() => view.root.render(<ImageInput value={[{ ...item }]} />));
      expect(view.container.querySelector('[data-testid="preview-modal"]')).not.toBeNull();

      act(() =>
        view.root.render(
          <ImageInput value={[{ ...item, url: 'https://cdn.example.test/replacement.jpg' }]} />,
        ),
      );
      expect(view.container.querySelector('[data-testid="preview-modal"]')).toBeNull();
      cleanupRenderedApp(view);
    });

    it('disables both overlay actions while the item is loading', () => {
      const view = renderApp(
        <ImageInput value={[{ ...makeItem('a'), isLoading: true }]} hasEdit />,
      );
      expect(view.container.querySelector('[aria-label="이미지 확대보기"]')).toBeDisabled();
      expect(view.container.querySelector('[aria-label="이미지 편집"]')).toBeDisabled();
      cleanupRenderedApp(view);
    });

    it('disables both overlay actions while ImageInput is loading', () => {
      const view = renderApp(<ImageInput value={[makeItem('a')]} hasEdit isLoading />);
      expect(view.container.querySelector('[aria-label="이미지 확대보기"]')).toBeDisabled();
      expect(view.container.querySelector('[aria-label="이미지 편집"]')).toBeDisabled();
      cleanupRenderedApp(view);
    });
  });

  describe('original link', () => {
    it('opens HTTPS URLs in a protected new tab when no callback is provided', () => {
      const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
      const url = 'https://cdn.example.test/image.jpg?width=original&token=keep';
      const view = renderApp(<ImageInput value={[makeItem('a', url)]} hasLink />);
      act(() => {
        Array.from(view.container.querySelectorAll('button'))
          .find((button) => button.textContent === '링크')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(openSpy).toHaveBeenCalledWith(url, '_blank', 'noopener,noreferrer');
      cleanupRenderedApp(view);
    });

    it('opens plain HTTP URLs in a protected new tab', () => {
      const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
      const url = 'http://cdn.example.test/image.jpg';
      const view = renderApp(<ImageInput value={[makeItem('a', url)]} hasLink />);
      act(() => {
        Array.from(view.container.querySelectorAll('button'))
          .find((button) => button.textContent === '링크')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(openSpy).toHaveBeenCalledWith(url, '_blank', 'noopener,noreferrer');
      cleanupRenderedApp(view);
    });

    it('preserves onLinkClick and rejects unsafe default URL protocols', () => {
      const onLinkClick = vi.fn();
      const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
      const overrideView = renderApp(
        <ImageInput
          value={[makeItem('callback', 'javascript:alert(1)')]}
          hasLink
          onLinkClick={onLinkClick}
        />,
      );
      act(() => {
        Array.from(overrideView.container.querySelectorAll('button'))
          .find((button) => button.textContent === '링크')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(onLinkClick).toHaveBeenCalledWith(makeItem('callback', 'javascript:alert(1)'));
      cleanupRenderedApp(overrideView);

      const unsafeView = renderApp(
        <ImageInput value={[makeItem('unsafe', 'javascript:alert(1)')]} hasLink />,
      );
      expect(
        Array.from(unsafeView.container.querySelectorAll('button')).some(
          (button) => button.textContent === '링크',
        ),
      ).toBe(false);
      expect(openSpy).not.toHaveBeenCalled();
      cleanupRenderedApp(unsafeView);
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
    it('edit icon opens crop modal without opening the replacement picker', () => {
      const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});
      const view = renderApp(<ImageInput value={[makeItem('a')]} hasEdit />);

      expect(view.container.querySelector('[data-testid="crop-modal"]')).toBeNull();

      act(() => {
        view.container
          .querySelector('[aria-label="이미지 편집"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(view.container.querySelector('[data-testid="crop-modal"]')).not.toBeNull();
      expect(clickSpy).not.toHaveBeenCalled();
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
