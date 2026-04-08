import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

// ─── Hoisted mock factories ───────────────────────────────────────────────────

const { mockDateTimePicker, mockCalendarIcon } = vi.hoisted(() => ({
  mockDateTimePicker: vi.fn(
    ({
      rightSection,
      classNames: _classNames,
      popoverProps: _popoverProps,
      ...props
    }: {
      className?: string;
      rightSection?: React.ReactNode;
      classNames?: unknown;
      popoverProps?: unknown;
      size?: string;
      locale?: string;
      firstDayOfWeek?: number;
      monthLabelFormat?: string;
      valueFormat?: string;
      [key: string]: unknown;
    }) => (
      <div
        data-testid="date-time-picker"
        data-props={JSON.stringify(props)}
        className={String(props.className ?? '')}
      >
        {rightSection}
      </div>
    ),
  ),
  mockCalendarIcon: vi.fn(({ size }: { size: number }) => (
    <div data-size={String(size)} data-testid="calendar-icon" />
  )),
}));

// ─── Module mocks ─────────────────────────────────────────────────────────────

vi.mock('@mantine/dates', () => ({
  DateTimePicker: (props: Parameters<typeof mockDateTimePicker>[0]) => mockDateTimePicker(props),
}));

vi.mock('@mantine/core', () => {
  const MockInput = ({
    children,
    rightSection,
    classNames: _classNames,
    component: _component,
    rightSectionWidth: _rightSectionWidth,
    ...rest
  }: {
    children?: React.ReactNode;
    rightSection?: React.ReactNode;
    classNames?: unknown;
    component?: unknown;
    rightSectionWidth?: unknown;
    [key: string]: unknown;
  }) => (
    <div data-testid="date-picker-input" {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
      {rightSection}
    </div>
  );

  const MockPopoverTarget = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  const MockPopoverDropdown = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover-dropdown">{children}</div>
  );
  const MockPopover = Object.assign(
    ({ children }: { children: React.ReactNode }) => <div data-testid="popover">{children}</div>,
    { Target: MockPopoverTarget, Dropdown: MockPopoverDropdown },
  );

  return { Input: MockInput, Popover: MockPopover };
});

vi.mock('@pop-ui/foundation', () => ({
  IconCalendar: (props: { size: number }) => mockCalendarIcon(props),
  parseDateValue: vi.fn(() => null),
  formatDateDisplay: vi.fn(() => ''),
  toValueString: vi.fn(() => null),
}));

vi.mock('../CalendarDatePicker', () => ({
  CalendarDatePicker: () => <div data-testid="calendar-date-picker" />,
}));

vi.mock('../CalendarDatePicker/utils', () => ({
  getEmptyValueForType: vi.fn(() => null),
  mergeClassNamesWithDefault: vi.fn((defaults: unknown) => defaults),
  resolveDatePickerValue: vi.fn(() => null),
}));

// ─── Imports ──────────────────────────────────────────────────────────────────

import { DatePicker } from '.';

import type { Root } from 'react-dom/client';

// ─── Helpers ──────────────────────────────────────────────────────────────────

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

interface IRenderedApp {
  container: HTMLDivElement;
  root: Root;
}

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

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('DatePicker', () => {
  afterEach(() => {
    mockDateTimePicker.mockClear();
    mockCalendarIcon.mockClear();
    document.body.innerHTML = '';
  });

  // ─── 기본 렌더 (Popover + Input 브랜치) ────────────────────────────────────

  describe('기본 입력 브랜치 (Popover + Input)', () => {
    it('withTime 없이 렌더하면 DateTimePicker가 아닌 Popover+Input이 렌더됨', () => {
      const view = renderApp(<DatePicker placeholder="날짜를 선택하세요" />);

      expect(mockDateTimePicker).not.toHaveBeenCalled();
      expect(view.container.querySelector('[data-testid="date-picker-input"]')).not.toBeNull();
      expect(view.container.querySelector('[data-testid="popover"]')).not.toBeNull();

      cleanupRenderedApp(view);
    });

    it('placeholder 텍스트가 렌더됨', () => {
      const view = renderApp(<DatePicker placeholder="날짜를 선택하세요" />);

      expect(view.container.textContent).toContain('날짜를 선택하세요');

      cleanupRenderedApp(view);
    });

    it('md(기본) size → 아이콘 size 18', () => {
      const view = renderApp(<DatePicker />);

      expect(
        view.container.querySelector('[data-testid="calendar-icon"]')?.getAttribute('data-size'),
      ).toBe('18');

      cleanupRenderedApp(view);
    });
  });

  // ─── size별 아이콘 크기 ─────────────────────────────────────────────────────

  describe('size → 아이콘 크기 매핑', () => {
    it.each([
      ['sm', '14'],
      ['lg', '24'],
    ] as const)('size=%s → 아이콘 size %s', (size, iconSize) => {
      const view = renderApp(<DatePicker size={size} />);

      expect(mockDateTimePicker).not.toHaveBeenCalled();
      expect(
        view.container.querySelector('[data-testid="calendar-icon"]')?.getAttribute('data-size'),
      ).toBe(iconSize);

      cleanupRenderedApp(view);
    });
  });

  // ─── withTime 브랜치 (DateTimePicker) ──────────────────────────────────────

  describe('withTime 브랜치 (DateTimePicker)', () => {
    it('withTime=true이면 DateTimePicker가 렌더됨', () => {
      const view = renderApp(<DatePicker withTime />);

      expect(mockDateTimePicker).toHaveBeenCalledTimes(1);
      expect(view.container.querySelector('[data-testid="date-picker-input"]')).toBeNull();

      cleanupRenderedApp(view);
    });

    it('DateTimePicker에 올바른 props가 전달됨', () => {
      const view = renderApp(
        <DatePicker withTime size="lg" placeholder="날짜와 시간을 선택하세요" />,
      );
      const props = mockDateTimePicker.mock.calls[0]?.[0];

      expect(props.size).toBe('lg');
      expect(props.locale).toBe('ko');
      expect(props.firstDayOfWeek).toBe(0);
      expect(props.monthLabelFormat).toBe('YYYY년 MM월');
      expect(props.valueFormat).toBe('YYYY-MM-DD | a hh:mm');
      expect(typeof props.className).toBe('string');

      cleanupRenderedApp(view);
    });

    it('withTime + lg → 아이콘 size 24', () => {
      const view = renderApp(<DatePicker withTime size="lg" />);

      expect(
        view.container.querySelector('[data-testid="calendar-icon"]')?.getAttribute('data-size'),
      ).toBe('24');

      cleanupRenderedApp(view);
    });
  });

  // ─── range 타입 ─────────────────────────────────────────────────────────────

  describe('range 타입', () => {
    it('type=range, size=sm → Popover+Input 렌더 + 아이콘 size 14', () => {
      const view = renderApp(<DatePicker type="range" size="sm" />);

      expect(mockDateTimePicker).not.toHaveBeenCalled();
      expect(view.container.querySelector('[data-testid="date-picker-input"]')).not.toBeNull();
      expect(
        view.container.querySelector('[data-testid="calendar-icon"]')?.getAttribute('data-size'),
      ).toBe('14');

      cleanupRenderedApp(view);
    });
  });

  // ─── disabled ───────────────────────────────────────────────────────────────

  describe('disabled', () => {
    it('disabled=true이면 Input에 disabled 속성이 전달됨', () => {
      const view = renderApp(<DatePicker disabled />);

      expect(
        view.container.querySelector('[data-testid="date-picker-input"]')?.getAttribute('disabled'),
      ).not.toBeUndefined();

      cleanupRenderedApp(view);
    });
  });
});
