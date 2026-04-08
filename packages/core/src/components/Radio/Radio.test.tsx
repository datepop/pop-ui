import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const mockMantineRadio = vi.fn(
  ({
    className,
    size,
    label,
    description,
    disabled,
    defaultChecked,
    checked,
    id,
    name,
    onChange,
    value,
  }: Record<string, unknown>) => (
    <div
      className={String(className)}
      data-description={String(description ?? '')}
      data-size={String(size ?? '')}
      data-testid="mantine-radio"
    >
      <input
        checked={typeof checked === 'boolean' ? checked : undefined}
        defaultChecked={typeof checked === 'boolean' ? undefined : Boolean(defaultChecked)}
        disabled={Boolean(disabled)}
        id={String(id ?? 'mock-radio')}
        name={String(name ?? '')}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement> | undefined}
        type="radio"
        value={String(value ?? '')}
      />
      <label htmlFor={String(id ?? 'mock-radio')}>{label as React.ReactNode}</label>
      <div>{description as React.ReactNode}</div>
    </div>
  ),
);

vi.mock('@mantine/core', () => ({
  Radio: (props: Record<string, unknown>) => mockMantineRadio(props),
}));

import { Radio } from '.';
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

describe('Radio', () => {
  afterEach(() => {
    mockMantineRadio.mockClear();
    document.body.innerHTML = '';
  });

  it('uses the medium class and forwards the medium size by default', () => {
    const view = renderApp(<Radio label="Choice" description="Description" />);

    const props = mockMantineRadio.mock.calls[0]?.[0];

    expect(props.className).toBe(styles['Radio--Medium']);
    expect(props.size).toBe('md');
    expect(props.label).toBe('Choice');
    expect(props.description).toBe('Description');

    cleanupRenderedApp(view);
  });

  it('maps explicit sizes to matching class names while preserving Mantine state props', () => {
    const view = renderApp(
      <>
        <Radio size="sm" disabled label="Small" />
        <Radio size="lg" defaultChecked label="Large" />
      </>,
    );

    const smallProps = mockMantineRadio.mock.calls[0]?.[0];
    const largeProps = mockMantineRadio.mock.calls[1]?.[0];

    expect(smallProps.className).toBe(styles['Radio--Small']);
    expect(smallProps.size).toBe('sm');
    expect(smallProps.disabled).toBe(true);
    expect(largeProps.className).toBe(styles['Radio--Large']);
    expect(largeProps.size).toBe('lg');
    expect(largeProps.defaultChecked).toBe(true);

    cleanupRenderedApp(view);
  });

  it('preserves JSX labels and per-item radio change events', () => {
    const onChange = vi.fn();
    const view = renderApp(
      <Radio
        id="gender-f"
        label={<span data-testid="radio-label">Female</span>}
        name="gender"
        onChange={onChange}
        value="F"
      />,
    );

    const label = view.container.querySelector('[data-testid="radio-label"]');
    const input = view.container.querySelector('input');

    expect(label?.textContent).toBe('Female');
    expect(input?.checked).toBe(false);
    expect(input?.getAttribute('name')).toBe('gender');
    expect(input?.getAttribute('value')).toBe('F');

    act(() => {
      input?.click();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect((onChange.mock.calls[0]?.[0] as React.ChangeEvent<HTMLInputElement>).target.value).toBe(
      'F',
    );

    cleanupRenderedApp(view);
  });

  it('keeps disabled radio items non-interactive while preserving unchecked defaults', () => {
    const onChange = vi.fn();
    const view = renderApp(<Radio disabled name="group" onChange={onChange} value="A" />);

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
