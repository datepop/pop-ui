import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

interface IMockedDatePickerProps {
  classNames?: Record<string, string>;
  date?: Date | string;
  onDateChange?: (date: Date | string) => void;
  previousIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  renderDay?: (date: Date) => React.ReactNode;
  onChange?: (value: unknown) => void;
  [key: string]: unknown;
}

const { mockMantineDatePicker, mockChevronLeft, mockChevronRight } = vi.hoisted(() => ({
  mockMantineDatePicker: vi.fn(({ classNames, previousIcon, nextIcon }: IMockedDatePickerProps) => (
    <div data-testid="mantine-calendar-date-picker">
      <div data-testid="class-names" data-value={JSON.stringify(classNames)} />
      {previousIcon}
      {nextIcon}
    </div>
  )),
  mockChevronLeft: vi.fn(() => <div data-testid="chevron-left" />),
  mockChevronRight: vi.fn(() => <div data-testid="chevron-right" />),
}));

vi.mock('@mantine/dates', () => ({
  DatePicker: (props: Record<string, unknown>) => mockMantineDatePicker(props),
}));

vi.mock('@pop-ui/foundation', () => ({
  IconChevronLeft: () => mockChevronLeft(),
  IconChevronRight: () => mockChevronRight(),
}));

import { CalendarDatePicker } from '.';

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

describe('CalendarDatePicker', () => {
  afterEach(() => {
    mockMantineDatePicker.mockClear();
    mockChevronLeft.mockClear();
    mockChevronRight.mockClear();
    document.body.innerHTML = '';
  });

  it('renders the inline calendar shell with the current shared class mapping and defaults', () => {
    const view = renderApp(<CalendarDatePicker />);
    const props = mockMantineDatePicker.mock.calls[0]?.[0];

    expect(mockMantineDatePicker).toHaveBeenCalledTimes(1);
    expect(props.locale).toBe('ko');
    expect(props.firstDayOfWeek).toBe(0);
    expect(props.monthLabelFormat).toBe('YYYY년 M월');
    expect(props.maxLevel).toBe('month');
    expect(props.type).toBe('default');
    expect(props.size).toBe('lg');
    expect(props.weekendDays).toEqual([0]);
    expect(props.highlightToday).toBe(false);
    const classNames = (props.classNames ?? {}) as Record<string, string>;

    expect(Object.keys(classNames)).toEqual([
      'levelsGroup',
      'calendarHeader',
      'calendarHeaderLevel',
      'calendarHeaderControl',
      'calendarHeaderControlIcon',
      'month',
      'monthCell',
      'day',
      'monthRow',
      'weekdaysRow',
      'weekday',
    ]);
    expect(Object.values(classNames).every(Boolean)).toBe(true);
    expect(view.container.querySelector('[data-testid="chevron-left"]')).not.toBeNull();
    expect(view.container.querySelector('[data-testid="chevron-right"]')).not.toBeNull();

    cleanupRenderedApp(view);
  });

  it('builds the exclusion checker and forwards min/max bounds without changing semantics', () => {
    const minDate = '2025-11-10';
    const maxDate = '2025-11-20';
    renderApp(
      <CalendarDatePicker
        excludedDates={['2025-11-14', ['2025-11-18', '2025-11-19']]}
        excludedDays={[0]}
        maxDate={maxDate}
        minDate={minDate}
      />,
    );

    const props = mockMantineDatePicker.mock.calls[0]?.[0];
    const excludeDate = props.excludeDate as (date: Date | string | number) => boolean;

    expect(props.minDate).toBe(minDate);
    expect(props.maxDate).toBe(maxDate);
    expect(excludeDate(new Date('2025-11-09T00:00:00.000Z'))).toBe(true);
    expect(excludeDate(new Date('2025-11-14T00:00:00.000Z'))).toBe(true);
    expect(excludeDate(new Date('2025-11-18T00:00:00.000Z'))).toBe(true);
    expect(excludeDate(new Date('2025-11-12T00:00:00.000Z'))).toBe(false);
  });

  it('adds the today indicator only when highlightToday is enabled', () => {
    const today = new Date();
    const highlightedView = renderApp(<CalendarDatePicker highlightToday />);
    const highlightedProps = mockMantineDatePicker.mock.calls[0]?.[0];
    const highlightedDay = renderApp(
      <>{(highlightedProps.renderDay as (date: Date) => React.ReactNode)(today)}</>,
    );

    expect(highlightedDay.container.textContent).toContain(String(today.getDate()));
    expect(highlightedDay.container.textContent).toContain('오늘');

    cleanupRenderedApp(highlightedDay);
    cleanupRenderedApp(highlightedView);

    const plainView = renderApp(<CalendarDatePicker highlightToday={false} />);
    const plainProps =
      mockMantineDatePicker.mock.calls[mockMantineDatePicker.mock.calls.length - 1]?.[0];
    const plainDay = renderApp(
      <>{(plainProps.renderDay as (date: Date) => React.ReactNode)(today)}</>,
    );

    expect(plainDay.container.textContent).toContain(String(today.getDate()));
    expect(plainDay.container.textContent).not.toContain('오늘');

    cleanupRenderedApp(plainDay);
    cleanupRenderedApp(plainView);
  });

  it('clears a completed range selection when the chosen range contains excluded dates', () => {
    const onChange = vi.fn();
    const view = renderApp(
      <CalendarDatePicker excludedDates={['2025-11-27']} onChange={onChange} type="range" />,
    );

    const props = mockMantineDatePicker.mock.calls[0]?.[0];
    const selectedRange: [Date | null, Date | null] = [
      new Date('2025-11-26T00:00:00.000Z'),
      new Date('2025-11-28T00:00:00.000Z'),
    ];

    act(() => {
      props.onChange?.(selectedRange);
    });

    expect(onChange).toHaveBeenCalledWith([null, null]);
    expect(
      mockMantineDatePicker.mock.calls[mockMantineDatePicker.mock.calls.length - 1]?.[0]?.value,
    ).toEqual([null, null]);

    cleanupRenderedApp(view);
  });

  it('moves displayed month focus only when an outside-month day is clicked', () => {
    const onDateChange = vi.fn();
    const view = renderApp(
      <CalendarDatePicker
        defaultDate={new Date('2025-11-01T00:00:00.000Z')}
        onDateChange={onDateChange}
      />,
    );

    const props = mockMantineDatePicker.mock.calls[0]?.[0];
    const outsideMonthDate = new Date('2025-10-30T00:00:00.000Z');
    const insideMonthDate = new Date('2025-11-12T00:00:00.000Z');

    act(() => {
      props.onChange?.(insideMonthDate);
    });

    expect(onDateChange).not.toHaveBeenCalled();

    const outsideDayProps = props.getDayProps?.('2025-10-30');
    const clickEvent = new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement>;

    act(() => {
      outsideDayProps?.onClick?.(clickEvent);
    });

    expect(onDateChange).toHaveBeenCalledWith('2025-10-30');
    expect(
      mockMantineDatePicker.mock.calls[mockMantineDatePicker.mock.calls.length - 1]?.[0]?.date,
    ).toEqual('2025-10-30');

    cleanupRenderedApp(view);
  });
});
