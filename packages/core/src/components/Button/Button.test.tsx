import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

interface IMockedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classNames?: unknown;
  unstyled?: boolean;
  loading?: boolean;
  loaderProps?: unknown;
}

const mockMantineButton = vi.fn(
  ({ children, classNames: _classNames, unstyled: _unstyled, ...props }: IMockedButtonProps) => (
    <button {...props}>{children}</button>
  ),
);
const mockLoader = vi.fn(({ color, size }: { color: string; size: number }) => (
  <div data-color={color} data-size={String(size)} data-testid="loader" />
));

vi.mock('@mantine/core', () => ({
  Button: (props: IMockedButtonProps) => mockMantineButton(props),
  Loader: (props: { color: string; size: number }) => mockLoader(props),
}));

import { Button } from '.';
import { BUTTON_LOADER_SIZES } from './style';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './type';

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

describe('Button', () => {
  afterEach(() => {
    mockMantineButton.mockClear();
    mockLoader.mockClear();
    document.body.innerHTML = '';
  });

  it('uses primary medium styling and button type by default', () => {
    const view = renderApp(<Button>Submit</Button>);

    expect(mockMantineButton).toHaveBeenCalledTimes(1);
    const props = mockMantineButton.mock.calls[0]?.[0];

    expect(props.type).toBe('button');
    expect(props.unstyled).toBe(true);
    expect(props.disabled).toBe(false);
    expect(props.className).toEqual(expect.stringContaining('Button'));
    expect(props.classNames).toMatchObject({
      inner: expect.any(String),
      label: expect.any(String),
      section: expect.any(String),
      loader: expect.any(String),
    });
    expect(view.container.querySelector('button')?.textContent).toContain('Submit');
    expect(view.container.querySelector('[data-testid="loader"]')).toBeNull();

    cleanupRenderedApp(view);
  });

  it.each(BUTTON_VARIANTS)('maps %s to the SCSS class-based styling contract', (variant) => {
    const view = renderApp(<Button variant={variant}>{variant}</Button>);

    const props = mockMantineButton.mock.calls[0]?.[0];

    expect(props.className).toEqual(expect.stringContaining('Button'));
    expect(view.container.querySelector('button')?.textContent).toContain(variant);
    expect(mockLoader).not.toHaveBeenCalled();

    cleanupRenderedApp(view);
  });

  it.each(BUTTON_SIZES.flatMap((size) => BUTTON_VARIANTS.map((variant) => ({ size, variant }))))(
    'replaces children with the canonical loader for $variant / $size and disables the button while loading',
    ({ size, variant }) => {
      const view = renderApp(
        <Button isLoading size={size} variant={variant}>
          Submit
        </Button>,
      );

      const props = mockMantineButton.mock.calls[0]?.[0];

      expect(props.disabled).toBe(true);
      expect(mockLoader).toHaveBeenCalledWith({
        color: 'currentColor',
        size: BUTTON_LOADER_SIZES[size],
      });
      expect(view.container.querySelector('button')?.textContent ?? '').not.toContain('Submit');
      expect(
        view.container.querySelector('[data-testid="loader"]')?.getAttribute('data-color'),
      ).toBe('currentColor');
      expect(
        view.container.querySelector('[data-testid="loader"]')?.getAttribute('data-size'),
      ).toBe(String(BUTTON_LOADER_SIZES[size]));

      cleanupRenderedApp(view);
    },
  );

  it('keeps an explicitly disabled button disabled even when not loading', () => {
    const view = renderApp(
      <Button disabled variant="primaryLine" size="sm">
        Disabled
      </Button>,
    );

    const props = mockMantineButton.mock.calls[0]?.[0];

    expect(props.disabled).toBe(true);
    expect(mockLoader).not.toHaveBeenCalled();

    cleanupRenderedApp(view);
  });

  it('supports Mantine loading prop compatibility without forwarding broken unstyled loading state', () => {
    const view = renderApp(<Button loading>Loading prop</Button>);

    const props = mockMantineButton.mock.calls[0]?.[0];

    expect(props.loading).toBeUndefined();
    expect(props.disabled).toBe(true);
    expect(mockLoader).toHaveBeenCalledWith({
      color: 'currentColor',
      size: BUTTON_LOADER_SIZES.md,
    });
    expect(view.container.querySelector('button')?.textContent ?? '').not.toContain('Loading prop');

    cleanupRenderedApp(view);
  });

  it('passes loaderProps to the rendered loader when loading is enabled', () => {
    const view = renderApp(
      <Button loading loaderProps={{ color: 'red', size: 24 }}>
        Loading prop
      </Button>,
    );

    expect(mockLoader).toHaveBeenCalledWith({
      color: 'red',
      size: 24,
    });
    expect(view.container.querySelector('[data-testid="loader"]')?.getAttribute('data-color')).toBe(
      'red',
    );
    expect(view.container.querySelector('[data-testid="loader"]')?.getAttribute('data-size')).toBe(
      '24',
    );

    cleanupRenderedApp(view);
  });

  it('keeps downstream root className support while preserving internal classes', () => {
    const view = renderApp(<Button className="custom-button">Custom</Button>);

    const props = mockMantineButton.mock.calls[0]?.[0];

    expect(props.className).toEqual(expect.stringContaining('custom-button'));
    expect(props.className).toEqual(expect.stringContaining('Button'));

    cleanupRenderedApp(view);
  });
});
