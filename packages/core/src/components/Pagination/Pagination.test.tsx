import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

vi.mock('@pop-ui/foundation', () => ({
  IconChevronLeft: () => <span data-testid="chevron-left" />,
  IconChevronRight: () => <span data-testid="chevron-right" />,
}));

import { Pagination } from '.';
import style from './style.module.scss';

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

const getButtons = (container: HTMLElement): HTMLButtonElement[] =>
  Array.from(container.querySelectorAll('button'));

const getPageButton = (container: HTMLElement, label: string): HTMLButtonElement | undefined =>
  getButtons(container).find((button) => button.textContent === label);

const getArrows = (container: HTMLElement): HTMLButtonElement[] =>
  getButtons(container).filter((button) => button.classList.contains(style['Pagination__Arrow']));

describe('Pagination', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders first-window page labels 1..5 with no prev arrow and a next arrow', () => {
    const view = renderApp(
      <Pagination currentPageIdx={0} totalLength={1000} rowsPerPage={50} paginationSize={5} />,
    );

    const labels = getButtons(view.container)
      .filter((button) => !button.classList.contains(style['Pagination__Arrow']))
      .map((button) => button.textContent);

    expect(labels).toEqual(['1', '2', '3', '4', '5']);
    expect(view.container.querySelector('[data-testid="chevron-left"]')).toBeNull();
    expect(view.container.querySelector('[data-testid="chevron-right"]')).not.toBeNull();

    cleanupRenderedApp(view);
  });

  it('fires onPageChange(label - 1) when a page button is clicked', () => {
    const onPageChange = vi.fn();
    const view = renderApp(
      <Pagination
        currentPageIdx={0}
        totalLength={1000}
        rowsPerPage={50}
        paginationSize={5}
        onPageChange={onPageChange}
      />,
    );

    const pageThree = getPageButton(view.container, '3');

    act(() => {
      pageThree?.click();
    });

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);

    cleanupRenderedApp(view);
  });

  it('applies the active class to the current page', () => {
    const view = renderApp(
      <Pagination currentPageIdx={2} totalLength={1000} rowsPerPage={50} paginationSize={5} />,
    );

    const pageThree = getPageButton(view.container, '3');
    const pageTwo = getPageButton(view.container, '2');

    expect(pageThree?.className).toBe(style['Pagination__PageIndex--Active']);
    expect(pageTwo?.className).toBe(style['Pagination__PageIndex']);

    cleanupRenderedApp(view);
  });

  it('skips page buttons past the total page count (overflow guard)', () => {
    const view = renderApp(
      <Pagination currentPageIdx={0} totalLength={120} rowsPerPage={50} paginationSize={5} />,
    );

    const labels = getButtons(view.container)
      .filter((button) => !button.classList.contains(style['Pagination__Arrow']))
      .map((button) => button.textContent);

    // ceil(120 / 50) = 3 pages
    expect(labels).toEqual(['1', '2', '3']);
    expect(getPageButton(view.container, '4')).toBeUndefined();
    expect(getPageButton(view.container, '5')).toBeUndefined();

    cleanupRenderedApp(view);
  });

  it('shows the prev arrow on the second window and fires onPageChange(4) on prev click', () => {
    const onPageChange = vi.fn();
    const view = renderApp(
      <Pagination
        currentPageIdx={5}
        totalLength={1000}
        rowsPerPage={50}
        paginationSize={5}
        onPageChange={onPageChange}
      />,
    );

    // second window labels: floor(5/5)*5 + index + 1 => 6..10
    const labels = getButtons(view.container)
      .filter((button) => !button.classList.contains(style['Pagination__Arrow']))
      .map((button) => button.textContent);

    expect(labels).toEqual(['6', '7', '8', '9', '10']);

    // both arrows present: prev (5 >= 5), next (10 < 20)
    expect(view.container.querySelector('[data-testid="chevron-left"]')).not.toBeNull();
    expect(view.container.querySelector('[data-testid="chevron-right"]')).not.toBeNull();

    const prevArrow = getArrows(view.container).find(
      (button) => button.querySelector('[data-testid="chevron-left"]') !== null,
    );

    act(() => {
      prevArrow?.click();
    });

    // 5 - ((5 % 5) + 1) = 4
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(4);

    cleanupRenderedApp(view);
  });
});
