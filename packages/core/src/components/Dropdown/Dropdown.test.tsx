import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const mockMantineSelect = vi.fn(
  ({ id, className, size, error, rightSection }: Record<string, unknown>) => (
    <div
      className={String(className ?? '')}
      data-error={String(error ?? '')}
      data-size={String(size ?? '')}
      data-testid="mantine-select"
    >
      <input id={id as string} />
      {rightSection as React.ReactNode}
    </div>
  ),
);

vi.mock('@mantine/core', () => {
  const Input = (props: Record<string, unknown>) => (
    <div data-testid="mantine-input">{props.children as React.ReactNode}</div>
  );

  Object.assign(Input, {
    Label: (props: Record<string, unknown>) => (
      <label data-testid="input-label" htmlFor={props.htmlFor as string}>
        {props.children as React.ReactNode}
      </label>
    ),
    Description: (props: Record<string, unknown>) => (
      <div data-testid="input-description">{props.children as React.ReactNode}</div>
    ),
    Error: (props: Record<string, unknown>) => (
      <div data-testid="input-error">{props.children as React.ReactNode}</div>
    ),
  });

  return {
    Select: (props: Record<string, unknown>) => mockMantineSelect(props),
    Input,
    Tooltip: (props: Record<string, unknown>) => (
      <div data-testid="mantine-tooltip">{props.children as React.ReactNode}</div>
    ),
  };
});

vi.mock('@pop-ui/foundation', () => ({
  ColorBlack: '#000000',
  ColorGray100: '#f5f5f5',
  IconInfoCircle: ({ size }: { size?: number }) => (
    <span data-size={String(size ?? '')} data-testid="icon-info" />
  ),
  IconChevronUp: ({ size }: { size?: number }) => (
    <span data-size={String(size ?? '')} data-testid="chevron-up" />
  ),
  IconChevronDown: ({ size }: { size?: number }) => (
    <span data-size={String(size ?? '')} data-testid="chevron-down" />
  ),
}));

import { Dropdown } from '.';
import styles from './styles.module.scss';

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

describe('Dropdown', () => {
  afterEach(() => {
    mockMantineSelect.mockClear();
    document.body.innerHTML = '';
  });

  it('connects each visible label to its own input and respects a supplied id', () => {
    const view = renderApp(
      <>
        <Dropdown label="분류" data={['예약']} />
        <Dropdown id="booking-status" label="상태" data={['완료']} />
      </>,
    );
    try {
      const labels = view.container.querySelectorAll('label');
      const inputs = view.container.querySelectorAll('input');
      expect(labels[0].control).toBe(inputs[0]);
      expect(labels[1].control).toBe(inputs[1]);
      expect(inputs[1].id).toBe('booking-status');
    } finally {
      cleanupRenderedApp(view);
    }
  });

  it('delegates error rendering to Select exactly once', () => {
    const view = renderApp(<Dropdown data={['A', 'B']} errorMsg="필수 항목입니다" />);

    const props = mockMantineSelect.mock.calls[0]?.[0];

    expect(props.error).toBe('필수 항목입니다');

    const error = view.container.querySelector('[data-testid="input-error"]');

    expect(error).toBeNull();

    cleanupRenderedApp(view);
  });

  it('toggles the chevron icon based on open/close callbacks from Select', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const view = renderApp(
      <Dropdown data={['A', 'B']} onDropdownOpen={onOpen} onDropdownClose={onClose} />,
    );

    expect(view.container.querySelector('[data-testid="chevron-down"]')).not.toBeNull();
    expect(view.container.querySelector('[data-testid="chevron-up"]')).toBeNull();

    const openProps = mockMantineSelect.mock.calls[0]?.[0];

    act(() => {
      (openProps.onDropdownOpen as () => void)();
    });

    expect(view.container.querySelector('[data-testid="chevron-up"]')).not.toBeNull();
    expect(view.container.querySelector('[data-testid="chevron-down"]')).toBeNull();

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();

    const closeProps = mockMantineSelect.mock.calls[mockMantineSelect.mock.calls.length - 1]?.[0];

    act(() => {
      (closeProps.onDropdownClose as () => void)();
    });

    expect(view.container.querySelector('[data-testid="chevron-down"]')).not.toBeNull();
    expect(view.container.querySelector('[data-testid="chevron-up"]')).toBeNull();

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    cleanupRenderedApp(view);
  });

  it('reflects an initially open dropdown and external changes to its controlled state', () => {
    const view = renderApp(<Dropdown defaultDropdownOpened />);
    try {
      expect(view.container.querySelector('[data-testid="chevron-up"]')).not.toBeNull();
      act(() => view.root.render(<Dropdown dropdownOpened={false} />));
      expect(view.container.querySelector('[data-testid="chevron-down"]')).not.toBeNull();
      act(() => view.root.render(<Dropdown dropdownOpened />));
      expect(view.container.querySelector('[data-testid="chevron-up"]')).not.toBeNull();
    } finally {
      cleanupRenderedApp(view);
    }
  });

  it('maps each size to the matching Select class name and chevron size', () => {
    const cases: Array<{
      size: 'sm' | 'md' | 'lg';
      className: string;
      chevronSize: string;
    }> = [
      { size: 'sm', className: styles['Dropdown--Small'], chevronSize: '14' },
      { size: 'md', className: styles['Dropdown--Medium'], chevronSize: '18' },
      { size: 'lg', className: styles['Dropdown--Large'], chevronSize: '24' },
    ];

    cases.forEach(({ size, className, chevronSize }) => {
      const view = renderApp(<Dropdown data={['A', 'B']} size={size} />);

      const props = mockMantineSelect.mock.calls[0]?.[0];

      expect(props.className).toBe(className);
      expect(props.size).toBe(size);

      const chevron = view.container.querySelector('[data-testid="chevron-down"]');

      expect(chevron?.getAttribute('data-size')).toBe(chevronSize);

      cleanupRenderedApp(view);
      mockMantineSelect.mockClear();
    });
  });

  it('applies the top-label wrapper class by default', () => {
    const view = renderApp(<Dropdown data={['A', 'B']} label="라벨" />);

    const wrapper = view.container.firstElementChild;

    expect(wrapper?.className).toBe(styles['Dropdown--TopLabel']);

    cleanupRenderedApp(view);
  });
});
