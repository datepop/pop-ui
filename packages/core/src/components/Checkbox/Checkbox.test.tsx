import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const mockMantineCheckbox = vi.fn(
  ({
    className,
    size,
    styles,
    label,
    description,
    disabled,
    defaultChecked,
    onChange,
  }: Record<string, unknown>) => {
    const inputId = 'mock-checkbox';

    return (
      <div
        className={String(className)}
        data-description={String(description ?? '')}
        data-height={String((styles as { inner?: { height?: number } })?.inner?.height ?? '')}
        data-size={String(size ?? '')}
        data-testid="mantine-checkbox"
        data-width={String((styles as { inner?: { width?: number } })?.inner?.width ?? '')}
      >
        <input
          id={inputId}
          defaultChecked={Boolean(defaultChecked)}
          disabled={Boolean(disabled)}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement> | undefined}
          type="checkbox"
          value="checked"
        />
        <label htmlFor={inputId}>{label as React.ReactNode}</label>
        <div>{description as React.ReactNode}</div>
      </div>
    );
  },
);

vi.mock('@mantine/core', () => ({
  Checkbox: (props: Record<string, unknown>) => mockMantineCheckbox(props),
}));

import { Checkbox } from '.';
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

describe('Checkbox', () => {
  afterEach(() => {
    mockMantineCheckbox.mockClear();
    document.body.innerHTML = '';
  });

  it('uses the medium styling contract by default', () => {
    const view = renderApp(<Checkbox label="Choice" description="Description" />);

    const props = mockMantineCheckbox.mock.calls[0]?.[0];

    expect(props.className).toBe(styles['Checkbox--Medium']);
    expect(props.size).toBe('md');
    expect(props.styles).toEqual({ inner: { width: 24, height: 24 } });
    expect(props.label).toBe('Choice');
    expect(props.description).toBe('Description');

    cleanupRenderedApp(view);
  });

  it('maps small and large sizes to different inner dimensions while preserving Mantine props', () => {
    const view = renderApp(
      <>
        <Checkbox size="sm" disabled label="Small" />
        <Checkbox size="lg" defaultChecked label="Large" />
      </>,
    );

    const smallProps = mockMantineCheckbox.mock.calls[0]?.[0];
    const largeProps = mockMantineCheckbox.mock.calls[1]?.[0];

    expect(smallProps.className).toBe(styles['Checkbox--Small']);
    expect(smallProps.size).toBe('sm');
    expect(smallProps.styles).toEqual({ inner: { width: 18, height: 18 } });
    expect(smallProps.disabled).toBe(true);
    expect(largeProps.className).toBe(styles['Checkbox--Large']);
    expect(largeProps.size).toBe('lg');
    expect(largeProps.styles).toEqual({ inner: { width: 32, height: 32 } });
    expect(largeProps.defaultChecked).toBe(true);

    cleanupRenderedApp(view);
  });

  it('preserves JSX labels and DOM-style change events for checked state updates', () => {
    const onChange = vi.fn();
    const view = renderApp(
      <Checkbox
        label={<span data-testid="checkbox-label">Accept terms</span>}
        onChange={onChange}
      />,
    );

    const label = view.container.querySelector('[data-testid="checkbox-label"]');
    const input = view.container.querySelector('input');

    expect(label?.textContent).toBe('Accept terms');
    expect(input).not.toBeNull();

    act(() => {
      input?.click();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(
      (onChange.mock.calls[0]?.[0] as React.ChangeEvent<HTMLInputElement>).target.checked,
    ).toBe(true);

    cleanupRenderedApp(view);
  });

  it('keeps disabled checkboxes non-interactive while preserving unchecked defaults', () => {
    const onChange = vi.fn();
    const view = renderApp(<Checkbox disabled onChange={onChange} />);

    const input = view.container.querySelector('input');

    expect(input?.disabled).toBe(true);
    expect(input?.checked).toBe(false);

    act(() => {
      input?.click();
    });

    expect(onChange).not.toHaveBeenCalled();

    cleanupRenderedApp(view);
  });
});
