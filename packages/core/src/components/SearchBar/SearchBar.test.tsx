import { MantineProvider } from '@mantine/core';
import { act } from 'react';
import { createRoot } from 'react-dom/client';

import { SearchBar } from '.';
import styles from './styles.module.scss';

import type { ISearchBarProps } from './types';
import type { Root } from 'react-dom/client';

vi.mock('@pop-ui/foundation', () => ({
  IconInfoCircle: () => <span />,
  IconX: () => <span />,
  IconSearch: () => <span />,
}));

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

describe('SearchBar', () => {
  let root: Root;
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  function render(props: ISearchBarProps) {
    act(() =>
      root.render(
        <MantineProvider>
          <SearchBar {...props} />
        </MantineProvider>,
      ),
    );
  }

  const clearButton = () =>
    container.querySelector<HTMLButtonElement>('button[aria-label="검색어 지우기"]');
  const input = () => container.querySelector('input')!;

  it('clears a prefilled uncontrolled input and returns focus to it', () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    render({ defaultValue: '예약', onChange, onClear, label: '검색' });
    const button = clearButton()!;
    expect(button.tabIndex).toBe(0);
    expect(button).not.toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('label')?.control).toBe(input());
    act(() => {
      button.focus();
      button.click();
    });
    expect(input()).toHaveValue('');
    expect(input()).toHaveFocus();
    expect(clearButton()).toBeNull();
    expect(onChange).toHaveBeenCalledExactlyOnceWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('uses the current controlled value, including changes from the parent', () => {
    const onChange = vi.fn();
    render({ value: '', onChange, clearable: true });
    expect(clearButton()).toBeNull();
    render({ value: '외부 검색어', onChange, clearable: true });
    act(() => clearButton()!.click());
    expect(onChange).toHaveBeenCalledExactlyOnceWith('');
    expect(input()).toHaveValue('외부 검색어');
    render({ value: '', onChange, clearable: true });
    expect(clearButton()).toBeNull();
  });

  it('clears an uncontrolled input without a change handler', () => {
    render({ defaultValue: '예약', clearable: true });
    act(() => clearButton()!.click());
    expect(input()).toHaveValue('');
    expect(clearButton()).toBeNull();
  });

  it.each([{}, { disabled: true, clearable: true }, { readOnly: true, clearable: true }])(
    'omits the clear action when it is unavailable',
    (props) => {
      render({ defaultValue: '예약', ...props });
      expect(clearButton()).toBeNull();
    },
  );

  it.each([
    ['sm', 'Small'],
    ['md', 'Medium'],
    ['lg', 'Large'],
  ] as const)('applies the %s size class', (size, suffix) => {
    render({ size });
    expect(container.querySelector('.' + styles['SearchBar--' + suffix])).not.toBeNull();
  });

  it('defaults to a medium field with a top label and forwards errors', () => {
    render({ errorMsg: '필수 항목입니다' });
    expect(container.querySelector('.' + styles['SearchBar--Medium'])).not.toBeNull();
    expect(container.querySelector('.' + styles['SearchBar--TopLabel'])).not.toBeNull();
    expect(input()).toHaveAttribute('aria-invalid', 'true');
  });
});
