import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const mockAutocomplete = vi.fn(
  ({ className, size, error, rightSection, onChange }: Record<string, unknown>) => (
    <div
      className={String(className)}
      data-error={String(error ?? '')}
      data-size={String(size ?? '')}
      data-testid="mantine-autocomplete"
    >
      <input
        data-testid="autocomplete-input"
        onChange={(e) => (onChange as ((value: string) => void) | undefined)?.(e.target.value)}
      />
      <div data-testid="right-section">{rightSection as React.ReactNode}</div>
    </div>
  ),
);

vi.mock('@mantine/core', () => {
  const Input = Object.assign(
    (props: Record<string, unknown>) => <div>{props.children as React.ReactNode}</div>,
    {
      Label: (props: Record<string, unknown>) => <label>{props.children as React.ReactNode}</label>,
      Description: (props: Record<string, unknown>) => (
        <div>{props.children as React.ReactNode}</div>
      ),
      Error: (props: Record<string, unknown>) => <div>{props.children as React.ReactNode}</div>,
    },
  );

  return {
    Autocomplete: (props: Record<string, unknown>) => mockAutocomplete(props),
    Input,
    Tooltip: (props: Record<string, unknown>) => <div>{props.children as React.ReactNode}</div>,
  };
});

vi.mock('@pop-ui/foundation', () => ({
  IconInfoCircle: () => <span data-testid="icon-info" />,
  IconX: () => <span data-testid="icon-x" />,
  IconSearch: () => <span data-testid="icon-search" />,
}));

import { SearchBar } from '.';
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

const latestProps = () =>
  mockAutocomplete.mock.calls[mockAutocomplete.mock.calls.length - 1]?.[0] as Record<
    string,
    unknown
  >;

describe('SearchBar', () => {
  afterEach(() => {
    mockAutocomplete.mockClear();
    document.body.innerHTML = '';
  });

  it('transforms the Autocomplete payload into a string for the user onChange', () => {
    const onChange = vi.fn();
    const view = renderApp(<SearchBar onChange={onChange} />);

    const onChangeHandler = latestProps().onChange as (value: string) => void;

    act(() => {
      onChangeHandler('hello');
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('hello');
    expect(typeof onChange.mock.calls[0]?.[0]).toBe('string');

    cleanupRenderedApp(view);
  });

  it('renders the clear button only when onClear is provided and text has been typed', () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    const view = renderApp(<SearchBar onChange={onChange} onClear={onClear} />);

    // textCount starts at 0 -> no clear button
    expect(latestProps().rightSection).toBeUndefined();

    // type -> drives textCount > 0
    const onChangeHandler = latestProps().onChange as (value: string) => void;
    act(() => {
      onChangeHandler('abc');
    });

    const clearButton = view.container.querySelector(`.${styles['SearchBar__ClearButton']}`);
    expect(clearButton).not.toBeNull();

    act(() => {
      (clearButton as HTMLElement).click();
    });
    expect(onClear).toHaveBeenCalledTimes(1);

    cleanupRenderedApp(view);
  });

  it('omits the clear button when onClear is absent even after typing', () => {
    const onChange = vi.fn();
    const view = renderApp(<SearchBar onChange={onChange} />);

    const onChangeHandler = latestProps().onChange as (value: string) => void;
    act(() => {
      onChangeHandler('abc');
    });

    expect(latestProps().rightSection).toBeUndefined();
    expect(view.container.querySelector(`.${styles['SearchBar__ClearButton']}`)).toBeNull();

    cleanupRenderedApp(view);
  });

  it('maps size to the matching Autocomplete className', () => {
    const small = renderApp(<SearchBar size="sm" />);
    expect(latestProps().className).toBe(styles['SearchBar--Small']);
    cleanupRenderedApp(small);
    mockAutocomplete.mockClear();

    const medium = renderApp(<SearchBar size="md" />);
    expect(latestProps().className).toBe(styles['SearchBar--Medium']);
    cleanupRenderedApp(medium);
    mockAutocomplete.mockClear();

    const large = renderApp(<SearchBar size="lg" />);
    expect(latestProps().className).toBe(styles['SearchBar--Large']);
    cleanupRenderedApp(large);
  });

  it('defaults to the medium className when size is omitted', () => {
    const view = renderApp(<SearchBar />);
    expect(latestProps().className).toBe(styles['SearchBar--Medium']);
    cleanupRenderedApp(view);
  });

  it('forwards errorMsg to the Autocomplete error prop', () => {
    const view = renderApp(<SearchBar errorMsg="required field" />);
    expect(latestProps().error).toBe('required field');
    cleanupRenderedApp(view);
  });

  it('applies the top-label wrapper class by default', () => {
    const view = renderApp(<SearchBar />);
    const wrapper = view.container.querySelector(`.${styles['SearchBar--TopLabel']}`);
    expect(wrapper).not.toBeNull();
    expect(view.container.querySelector(`.${styles['SearchBar--LeftLabel']}`)).toBeNull();
    cleanupRenderedApp(view);
  });
});
