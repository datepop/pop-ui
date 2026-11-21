import { MantineProvider } from '@mantine/core';
import { act } from 'react';
import { createRoot } from 'react-dom/client';

import { DatePicker } from '../DatePicker';
import { Dropdown } from '../Dropdown';
import { SearchBar } from '../SearchBar';
import { TextField } from '../TextField';

import type { IFieldFeedbackProps, ILegacyFieldError } from './field';
import type { ReactElement } from 'react';
import type { Root } from 'react-dom/client';

type TFieldProps = IFieldFeedbackProps & { id: string; label: string };
type TExample = [string, (props: TFieldProps & ILegacyFieldError) => ReactElement];
const withAlias: TExample[] = [
  ['TextField', (props) => <TextField {...props} />],
  ['TextField textarea', (props) => <TextField {...props} textarea />],
  ['SearchBar', (props) => <SearchBar {...props} />],
  ['Dropdown', (props) => <Dropdown {...props} />],
];
const examples: TExample[] = [
  ...withAlias,
  ['DatePicker', (props) => <DatePicker {...props} />],
  ['DatePicker withTime', (props) => <DatePicker {...props} withTime />],
];

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;
let container: HTMLDivElement;
let root: Root;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});
function render(element: ReactElement) {
  act(() => root.render(<MantineProvider>{element}</MantineProvider>));
}
const props = { id: 'field', label: '예약', required: true, description: <span>안내</span> };

it.each(examples)('%s associates a required field with the rendered feedback', (_, field) => {
  render(field({ ...props, error: <strong>오류</strong> }));
  const control = document.getElementById(props.id)!;
  expect(container.querySelector('label')?.control).toBe(control);
  expect(control.hasAttribute('required') || control.getAttribute('aria-required') === 'true').toBe(
    true,
  );
  expect(control).toHaveAttribute('aria-invalid', 'true');
  const ids = control.getAttribute('aria-describedby')!.trim().split(/\s+/);
  expect(ids.map((id) => document.getElementById(id)?.textContent).sort()).toEqual(
    ['안내', '오류'].sort(),
  );
  expect(container.querySelectorAll('strong')).toHaveLength(1);
  render(field({ ...props, error: false }));
  expect(control).not.toHaveAttribute('aria-invalid', 'true');
  expect(container.querySelector('strong')).toBeNull();
});
it.each(withAlias)('%s supports errorMsg and respects explicit overrides', (_, field) => {
  render(field({ ...props, errorMsg: '이전 오류' }));
  expect(container.textContent).toContain('이전 오류');
  render(field({ ...props, errorMsg: '이전 오류', error: '새 오류' }));
  expect(container.textContent).toContain('새 오류');
  expect(container.textContent).not.toContain('이전 오류');
  render(field({ ...props, errorMsg: '이전 오류', error: null }));
  expect(container.textContent).not.toContain('이전 오류');
  expect(document.getElementById(props.id)).not.toHaveAttribute('aria-invalid', 'true');
});
