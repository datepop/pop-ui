import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const mockSwitch = vi.fn(
  ({
    className,
    size,
    labelPosition,
    disabled,
    onChange,
    styles: stylesProp,
  }: Record<string, unknown>) => (
    <div className={String(className)} data-labelposition={String(labelPosition ?? '')}>
      <input
        disabled={Boolean(disabled)}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement> | undefined}
        type="checkbox"
      />
      <span data-size={String(size ?? '')} data-styles={typeof stylesProp} />
    </div>
  ),
);

vi.mock('@mantine/core', () => ({
  Switch: (props: Record<string, unknown>) => mockSwitch(props),
}));

vi.mock('@pop-ui/foundation', () => ({ ColorAqua500: '#0fd3d8' }));

import { Toggle } from '.';
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

type TStylesFn = () => { track: { width: number; backgroundColor?: string; borderColor?: string } };

const getStyles = (call: number): TStylesFn => mockSwitch.mock.calls[call]?.[0].styles as TStylesFn;

describe('Toggle', () => {
  afterEach(() => {
    mockSwitch.mockClear();
    document.body.innerHTML = '';
  });

  it('uses the medium class, right label position, and 50px track width by default', () => {
    const view = renderApp(<Toggle labelPosition="right" />);

    const props = mockSwitch.mock.calls[0]?.[0];

    expect(props.className).toBe(styles['Toggle--Medium']);
    expect(props.labelPosition).toBe('right');
    expect(getStyles(0)().track.width).toBe(50);

    cleanupRenderedApp(view);
  });

  it('maps sm and lg sizes to matching class names and track widths', () => {
    const view = renderApp(
      <>
        <Toggle labelPosition="right" size="sm" />
        <Toggle labelPosition="right" size="lg" />
      </>,
    );

    const smallProps = mockSwitch.mock.calls[0]?.[0];
    const largeProps = mockSwitch.mock.calls[1]?.[0];

    expect(smallProps.className).toBe(styles['Toggle--Small']);
    expect(getStyles(0)().track.width).toBe(38);
    expect(largeProps.className).toBe(styles['Toggle--Large']);
    expect(getStyles(1)().track.width).toBe(67);

    cleanupRenderedApp(view);
  });

  it('forwards the change event to the user-provided onChange', () => {
    const onChange = vi.fn();
    const view = renderApp(<Toggle labelPosition="right" onChange={onChange} />);

    const input = view.container.querySelector('input');

    act(() => {
      input?.click();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(
      (onChange.mock.calls[0]?.[0] as React.ChangeEvent<HTMLInputElement>).target.checked,
    ).toBe(true);

    cleanupRenderedApp(view);
  });

  it('seeds isChecked from the checked prop and reflects it in the track color', () => {
    const view = renderApp(<Toggle checked labelPosition="right" />);

    const track = getStyles(0)().track;

    expect(track.backgroundColor).toBe('#0fd3d8 !important');
    expect(track.borderColor).toBe('#0fd3d8 !important');

    cleanupRenderedApp(view);
  });
});
