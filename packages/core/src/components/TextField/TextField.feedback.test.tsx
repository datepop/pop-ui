import { MantineProvider } from '@mantine/core';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';

import { TextField } from '.';

it('links textarea feedback to the rendered custom IDs and preserves alert semantics', () => {
  const root = document.createElement('div');
  root.innerHTML = renderToStaticMarkup(
    <MantineProvider>
      <TextField
        textarea
        required
        description="설명"
        descriptionProps={{ id: 'custom-help' }}
        error="오류"
        errorProps={{ id: 'custom-error', role: 'alert' }}
      />
    </MantineProvider>,
  );
  const field = root.querySelector('textarea')!;
  expect(field.getAttribute('aria-describedby')?.split(/\s+/).sort()).toEqual([
    'custom-error',
    'custom-help',
  ]);
  expect(field.required).toBe(false);
  expect(root.querySelectorAll('#custom-error')).toHaveLength(1);
  expect(root.querySelector('#custom-error')?.getAttribute('role')).toBe('alert');
  expect(root.querySelector('#custom-help')?.textContent).toBe('설명');
});
