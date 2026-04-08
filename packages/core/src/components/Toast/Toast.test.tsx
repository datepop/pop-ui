import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const { cleanSpy, hideSpy, showSpy, updateSpy } = vi.hoisted(() => ({
  showSpy: vi.fn(),
  updateSpy: vi.fn(),
  hideSpy: vi.fn(),
  cleanSpy: vi.fn(),
}));

vi.mock('@mantine/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mantine/core')>();

  return {
    ...actual,
    MantineProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock('@mantine/notifications', () => ({
  Notifications: ({ position }: { position?: string }) => (
    <div data-position={position} data-testid="notifications" />
  ),
  notifications: {
    show: showSpy,
    update: updateSpy,
    hide: hideSpy,
    clean: cleanSpy,
  },
}));

import { toast } from '.';
import styles from './styles.module.scss';
import { PopUiProvider } from '../../theme';

import type { Root } from 'react-dom/client';

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

const ProviderBackedToastTrigger = () => {
  return (
    <button onClick={() => toast('Rendered from provider boundary')} type="button">
      Trigger toast
    </button>
  );
};

describe('toast', () => {
  afterEach(() => {
    showSpy.mockClear();
    updateSpy.mockClear();
    hideSpy.mockClear();
    cleanSpy.mockClear();
    document.body.innerHTML = '';
  });

  it('wraps string input in the canonical notification payload', () => {
    toast('Saved successfully');

    expect(showSpy).toHaveBeenCalledTimes(1);
    const payload = showSpy.mock.calls[0]?.[0];

    expect(payload.id).toBeUndefined();
    expect(payload.autoClose).toBeUndefined();
    expect(payload.classNames).toEqual({
      root: styles.Toast,
      body: styles.Toast__Body,
      icon: styles.Toast__Icon,
    });
    expect(payload.withCloseButton).toBe(false);
    expect(payload.withBorder).toBe(false);
    expect(payload.message.props.className).toBe(styles.Toast__Message);
    expect(payload.message.props.children).toBe('Saved successfully');
  });

  it('preserves id, icon, and autoClose when showing and updating a toast', () => {
    const icon = <span data-testid="icon" />;

    toast({ id: 'save-toast', message: 'Saving...', icon, autoClose: false });
    toast.update('save-toast', {
      id: 'ignored-update-id',
      message: 'Saved!',
      icon,
      autoClose: 3000,
    });

    expect(showSpy).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'save-toast', icon, autoClose: false }),
    );
    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'save-toast', icon, autoClose: 3000 }),
    );

    const updatePayload = updateSpy.mock.calls[0]?.[0];
    expect(updatePayload.id).toBe('save-toast');
    expect(updatePayload.message.props.className).toBe(styles.Toast__Message);
    expect(updatePayload.message.props.children).toBe('Saved!');
  });

  it('passes hide and clean through to mantine notifications', () => {
    toast.hide('save-toast');
    toast.clean();

    expect(hideSpy).toHaveBeenCalledWith('save-toast');
    expect(cleanSpy).toHaveBeenCalledTimes(1);
  });

  it('uses the PopUiProvider notifications boundary for provider-backed usage', () => {
    const view = renderApp(
      <PopUiProvider notificationPosition="top-right">
        <ProviderBackedToastTrigger />
      </PopUiProvider>,
    );

    expect(view.container.querySelector('[data-testid="notifications"]')).toHaveAttribute(
      'data-position',
      'top-right',
    );

    const trigger = view.container.querySelector('button');
    expect(trigger).not.toBeNull();

    act(() => {
      trigger?.click();
    });

    expect(showSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        classNames: {
          root: styles.Toast,
          body: styles.Toast__Body,
          icon: styles.Toast__Icon,
        },
      }),
    );

    cleanupRenderedApp(view);
  });
});
