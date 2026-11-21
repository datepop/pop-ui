import { MantineProvider } from '@mantine/core';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, it } from 'vitest';

import { DatePicker } from '.';

it('clears a failed required check after a valid date, including a later controlled reset', async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const render = (value: string | null) =>
    act(() =>
      root.render(
        <MantineProvider>
          <form>
            <DatePicker required value={value} />
          </form>
        </MantineProvider>,
      ),
    );
  try {
    await render(null);
    await act(() => {
      container.querySelector('input[required]')!.dispatchEvent(new Event('invalid'));
    });
    expect(container.querySelector('[role="alert"]')).toHaveTextContent('날짜를 선택해주세요.');
    await render('2026-11-22');
    expect(container.querySelector('[role="alert"]')).toBeNull();
    await render(null);
    expect(container.querySelector('[role="alert"]')).toBeNull();
  } finally {
    await act(() => root.unmount());
    container.remove();
  }
});
