import { MantineProvider } from '@mantine/core';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { StepNavigation } from '.';

import type { Root } from 'react-dom/client';

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

const steps = [
  { value: 'account', label: '계정 정보' },
  { value: 'contract', label: '계약서 정보', disabled: true },
  { value: 'shop', label: '제휴점 정보' },
];

describe('StepNavigation', () => {
  let root: Root;
  let container: HTMLDivElement;

  afterEach(() => {
    if (root) act(() => root.unmount());
    container?.remove();
  });

  it('marks the current step and only selects enabled other steps', () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    const onChange = vi.fn();
    act(() => {
      root.render(
        <MantineProvider>
          <StepNavigation
            steps={steps}
            value="account"
            onChange={onChange}
            ariaLabel="상품 등록 단계"
          />
        </MantineProvider>,
      );
    });

    const nav = container.querySelector('nav');
    const buttons = Array.from(container.querySelectorAll('button'));
    expect(nav?.getAttribute('aria-label')).toBe('상품 등록 단계');
    expect(buttons).toHaveLength(3);
    expect(buttons[0].getAttribute('aria-current')).toBe('step');
    expect(buttons[1].disabled).toBe(true);
    expect(buttons[2].getAttribute('aria-current')).toBeNull();

    act(() => {
      buttons[0].click();
      buttons[1].click();
      buttons[2].click();
    });
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('shop');
  });
});
