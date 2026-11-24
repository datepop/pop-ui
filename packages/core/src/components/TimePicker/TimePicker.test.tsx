import { MantineProvider } from '@mantine/core';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, it, vi } from 'vitest';

import { TimePicker } from './index';

it('opens the native picker only while the time is editable', () => {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  const showPicker = vi.fn();

  try {
    for (const props of [{}, { disabled: true }, { readOnly: true }, {}]) {
      act(() =>
        root.render(
          <MantineProvider>
            <TimePicker {...props} />
          </MantineProvider>,
        ),
      );
      const input = host.querySelector('input')!;
      const button = host.querySelector('button')!;
      input.showPicker = showPicker;
      showPicker.mockClear();
      act(() => button.click());

      const editable = !input.disabled && !input.readOnly;
      expect(button.disabled).toBe(!editable);
      expect(showPicker).toHaveBeenCalledTimes(editable ? 1 : 0);
    }
  } finally {
    act(() => root.unmount());
    host.remove();
  }
});
