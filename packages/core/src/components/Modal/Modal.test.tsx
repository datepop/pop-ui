import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const mockMantineModal = vi.fn((_props: Record<string, unknown>) => <div data-testid="modal" />);

vi.mock('@mantine/core', () => ({
  Modal: (props: Record<string, unknown>) => mockMantineModal(props),
}));

vi.mock('@pop-ui/foundation', () => ({
  ColorGray600: '#6a6a6a',
  ColorGray900: '#1a1a1a',
  IconX: () => null,
}));

import { Modal } from '.';

import type { IModalProps } from './types';
import type { Root } from 'react-dom/client';

interface IRenderedApp {
  container: HTMLDivElement;
  root: Root;
}

type TStylesRecord = Record<string, React.CSSProperties>;

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

const getProps = () => mockMantineModal.mock.lastCall?.[0] as Record<string, unknown>;

const DEFAULT_STYLES: TStylesRecord = {
  content: { borderRadius: '12px' },
  title: { fontSize: '16px', fontWeight: '700', lineHeight: '150%', color: '#1a1a1a' },
  header: { padding: '16px' },
  body: { paddingInline: 0 },
};

describe('Modal', () => {
  afterEach(() => {
    mockMantineModal.mockClear();
    document.body.innerHTML = '';
  });

  it('applies the default slot styles and md width when no styles are passed', () => {
    const view = renderApp(<Modal opened onClose={() => {}} />);

    expect(getProps().size).toBe(768);
    expect(getProps().styles).toEqual(DEFAULT_STYLES);

    cleanupRenderedApp(view);
  });

  it('merges object styles per slot so user properties win and other defaults remain', () => {
    const view = renderApp(
      <Modal
        opened
        onClose={() => {}}
        styles={{
          content: { backgroundColor: 'red' },
          title: { fontSize: '20px' },
          overlay: { opacity: 0.5 },
        }}
      />,
    );

    expect(getProps().styles).toEqual({
      ...DEFAULT_STYLES,
      content: { borderRadius: '12px', backgroundColor: 'red' },
      title: { ...DEFAULT_STYLES.title, fontSize: '20px' },
      overlay: { opacity: 0.5 },
    });

    cleanupRenderedApp(view);
  });

  it('lets user body padding coexist with the default inline padding reset', () => {
    const view = renderApp(
      <Modal opened onClose={() => {}} styles={{ body: { padding: '8px' } }} />,
    );

    expect((getProps().styles as TStylesRecord).body).toEqual({ paddingInline: 0, padding: '8px' });

    cleanupRenderedApp(view);
  });

  it('drops the default content radius in fullScreen so Mantine keeps its square corners', () => {
    const view = renderApp(<Modal opened fullScreen onClose={() => {}} />);

    const styles = getProps().styles as TStylesRecord;

    expect(getProps().fullScreen).toBe(true);
    expect(styles.content?.borderRadius).toBeUndefined();
    expect(styles.title).toEqual(DEFAULT_STYLES.title);

    cleanupRenderedApp(view);
  });

  it('passes function-form styles through unchanged', () => {
    const userStyles = () => ({ content: { backgroundColor: 'red' } });
    const view = renderApp(
      <Modal opened onClose={() => {}} styles={userStyles as unknown as IModalProps['styles']} />,
    );

    expect(getProps().styles).toBe(userStyles);

    cleanupRenderedApp(view);
  });

  it('forwards classNames without dropping the default styles', () => {
    const view = renderApp(
      <Modal opened onClose={() => {}} classNames={{ content: 'custom-content' }} />,
    );

    expect(getProps().classNames).toEqual({ content: 'custom-content' });
    expect(getProps().styles).toEqual(DEFAULT_STYLES);

    cleanupRenderedApp(view);
  });
});
