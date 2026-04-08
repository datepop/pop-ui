import { colors, getCSSVariableName } from '@pop-ui/foundation';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';


import { PopUiProvider, usePopUIConfig, useTheme } from './ThemeProvider';

import type { Root } from 'react-dom/client';

vi.mock('@mantine/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mantine/core')>();

  return {
    ...actual,
    MantineProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock('@mantine/notifications', () => ({
  Notifications: ({
    position,
    limit,
    autoClose,
    zIndex,
  }: {
    position?: string;
    limit?: number;
    autoClose?: number | false;
    zIndex?: number;
  }) => (
    <div
      data-testid="notifications"
      data-autoclose={String(autoClose)}
      data-limit={String(limit)}
      data-position={position}
      data-zindex={String(zIndex)}
    />
  ),
}));

interface IRenderedApp {
  container: HTMLDivElement;
  root: Root;
}

type TReactActEnvironmentGlobal = typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT?: boolean;
};

const reactActEnvironmentGlobal = globalThis as TReactActEnvironmentGlobal;

reactActEnvironmentGlobal.IS_REACT_ACT_ENVIRONMENT = true;

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

const ThemeProbe = () => {
  const { theme, setTheme, toggleTheme } = useTheme();
  const config = usePopUIConfig();

  return (
    <>
      <div id="theme-probe" data-client-id={config.naverClientId ?? ''} data-theme={theme} />
      <button id="toggle-theme" onClick={toggleTheme} type="button">
        toggle
      </button>
      <button id="set-light-theme" onClick={() => setTheme('light')} type="button">
        light
      </button>
    </>
  );
};

describe('PopUiProvider', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.head.querySelectorAll('#pop-ui-theme-vars').forEach((node) => node.remove());
    document.documentElement.removeAttribute('data-theme');
  });

  it('injects the CSS variables contract and updates the runtime theme state', () => {
    const view = renderApp(
      <PopUiProvider
        defaultTheme="light"
        naverClientId="test-client-id"
        notificationAutoClose={5000}
        notificationLimit={3}
        notificationPosition="top-left"
        notificationZIndex={400}
      >
        <ThemeProbe />
      </PopUiProvider>,
    );

    const style = document.getElementById('pop-ui-theme-vars');
    expect(style).not.toBeNull();
    expect(style?.textContent).toContain(':root');
    expect(style?.textContent).toContain('[data-theme="dark"]');
    expect(style?.textContent).toContain(
      `${getCSSVariableName('aqua', '500')}: ${colors.aqua['500']};`,
    );

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    const themeProbe = view.container.querySelector('#theme-probe');
    expect(themeProbe).toHaveAttribute('data-theme', 'light');
    expect(themeProbe).toHaveAttribute('data-client-id', 'test-client-id');

    const notifications = view.container.querySelector('[data-testid="notifications"]');
    expect(notifications).toHaveAttribute('data-position', 'top-left');
    expect(notifications).toHaveAttribute('data-limit', '3');
    expect(notifications).toHaveAttribute('data-autoclose', '5000');
    expect(notifications).toHaveAttribute('data-zindex', '400');

    const toggleButton = view.container.querySelector<HTMLButtonElement>('#toggle-theme');
    expect(toggleButton).not.toBeNull();

    act(() => {
      toggleButton?.click();
    });

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(view.container.querySelector('#theme-probe')).toHaveAttribute('data-theme', 'dark');
    expect(document.head.querySelectorAll('#pop-ui-theme-vars')).toHaveLength(1);

    const setLightButton = view.container.querySelector<HTMLButtonElement>('#set-light-theme');
    expect(setLightButton).not.toBeNull();

    act(() => {
      setLightButton?.click();
    });

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(document.head.querySelectorAll('#pop-ui-theme-vars')).toHaveLength(1);

    cleanupRenderedApp(view);
  });

  it('throws when useTheme is rendered outside the provider boundary', () => {
    expect(() => {
      const view = renderApp(<ThemeProbe />);
      cleanupRenderedApp(view);
    }).toThrow('useTheme must be used within ThemeProvider');
  });
});
