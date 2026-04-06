import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

interface IMockedDatePickerInputProps {
  className?: string;
  rightSection?: React.ReactNode;
  size?: string;
  type?: string;
  locale?: string;
  firstDayOfWeek?: number;
  monthLabelFormat?: string;
  valueFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  [key: string]: unknown;
}

interface IMockedDateTimePickerProps {
  className?: string;
  rightSection?: React.ReactNode;
  size?: string;
  locale?: string;
  firstDayOfWeek?: number;
  monthLabelFormat?: string;
  valueFormat?: string;
  [key: string]: unknown;
}

const { mockDatePickerInput, mockDateTimePicker, mockCalendarIcon } = vi.hoisted(() => ({
  mockDatePickerInput: vi.fn(
    ({ className, rightSection, ...props }: IMockedDatePickerInputProps) => (
      <div
        className={String(className)}
        data-testid="date-picker-input"
        data-type={String(props.type ?? '')}
      >
        <div data-testid="date-picker-input-props" data-props={JSON.stringify(props)} />
        {rightSection}
      </div>
    ),
  ),
  mockDateTimePicker: vi.fn(({ className, rightSection, ...props }: IMockedDateTimePickerProps) => (
    <div className={String(className)} data-testid="date-time-picker">
      <div data-testid="date-time-picker-props" data-props={JSON.stringify(props)} />
      {rightSection}
    </div>
  )),
  mockCalendarIcon: vi.fn(({ size }: { size: number }) => (
    <div data-size={String(size)} data-testid="calendar-icon" />
  )),
}));

vi.mock('@mantine/dates', () => ({
  DatePickerInput: (props: IMockedDatePickerInputProps) => mockDatePickerInput(props),
  DateTimePicker: (props: IMockedDateTimePickerProps) => mockDateTimePicker(props),
}));

vi.mock('@pop-ui/foundation', () => ({
  IconCalendar: (props: { size: number }) => mockCalendarIcon(props),
}));

import { DatePicker } from '.';

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

describe('DatePicker', () => {
  afterEach(() => {
    mockDatePickerInput.mockClear();
    mockDateTimePicker.mockClear();
    mockCalendarIcon.mockClear();
    document.body.innerHTML = '';
  });

  it('renders the default input branch with the medium baseline contract', () => {
    const minDate = new Date('2025-11-01T00:00:00.000Z');
    const maxDate = new Date('2025-11-30T00:00:00.000Z');
    const view = renderApp(
      <DatePicker minDate={minDate} maxDate={maxDate} placeholder="Pick a date" />,
    );

    const props = mockDatePickerInput.mock.calls[0]?.[0];

    expect(mockDatePickerInput).toHaveBeenCalledTimes(1);
    expect(mockDateTimePicker).not.toHaveBeenCalled();
    expect(typeof props.className).toBe('string');
    expect(props.size).toBe('md');
    expect(props.type).toBe('default');
    expect(props.locale).toBe('ko');
    expect(props.firstDayOfWeek).toBe(0);
    expect(props.monthLabelFormat).toBe('YYYY년 MM월');
    expect(props.valueFormat).toBe('YYYY-MM-DD');
    expect(props.minDate).toBe(minDate);
    expect(props.maxDate).toBe(maxDate);
    expect(
      view.container.querySelector('[data-testid="calendar-icon"]')?.getAttribute('data-size'),
    ).toBe('18');

    cleanupRenderedApp(view);
  });

  it.each([
    ['sm', '14'],
    ['lg', '24'],
  ] as const)('maps the %s size to the current shell class and icon ladder', (size, iconSize) => {
    const view = renderApp(<DatePicker size={size} />);
    const props = mockDatePickerInput.mock.calls[0]?.[0];

    expect(typeof props.className).toBe('string');
    expect(props.size).toBe(size);
    expect(
      view.container.querySelector('[data-testid="calendar-icon"]')?.getAttribute('data-size'),
    ).toBe(iconSize);

    cleanupRenderedApp(view);
  });

  it('switches to the date-time branch when withTime is enabled', () => {
    const view = renderApp(<DatePicker withTime size="lg" placeholder="Pick date and time" />);
    const props = mockDateTimePicker.mock.calls[0]?.[0];

    expect(mockDatePickerInput).not.toHaveBeenCalled();
    expect(mockDateTimePicker).toHaveBeenCalledTimes(1);
    expect(typeof props.className).toBe('string');
    expect(props.size).toBe('lg');
    expect(props.locale).toBe('ko');
    expect(props.firstDayOfWeek).toBe(0);
    expect(props.monthLabelFormat).toBe('YYYY년 MM월');
    expect(props.valueFormat).toBe('YYYY-MM-DD | a hh:mm');
    expect(
      view.container.querySelector('[data-testid="calendar-icon"]')?.getAttribute('data-size'),
    ).toBe('24');

    cleanupRenderedApp(view);
  });

  it('preserves range mode on the input branch without changing other baseline props', () => {
    const view = renderApp(<DatePicker type="range" size="sm" />);
    const props = mockDatePickerInput.mock.calls[0]?.[0];

    expect(typeof props.className).toBe('string');
    expect(props.size).toBe('sm');
    expect(props.type).toBe('range');
    expect(props.valueFormat).toBe('YYYY-MM-DD');
    expect(props.locale).toBe('ko');
    expect(props.firstDayOfWeek).toBe(0);
    expect(
      view.container.querySelector('[data-testid="calendar-icon"]')?.getAttribute('data-size'),
    ).toBe('14');

    cleanupRenderedApp(view);
  });
});
