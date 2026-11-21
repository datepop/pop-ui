import type { ReactNode } from 'react';

export function WidthComparison({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap: 32 }}>
      {[320, 180].map((width) => (
        <section
          key={width}
          aria-label={`${width}px`}
          data-comparison-width={width}
          style={{ width, maxWidth: '100%', minWidth: 0, display: 'grid', gap: 20 }}
        >
          <h2 style={{ margin: 0, fontSize: 18 }}>{width}px</h2>
          {children}
        </section>
      ))}
    </div>
  );
}

export async function checkComparisonWidth({ canvasElement }: { canvasElement: HTMLElement }) {
  const document = canvasElement.ownerDocument;
  await document.fonts.ready;
  if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) {
    throw new Error('너비 비교 화면에 가로 스크롤이 생겼습니다.');
  }
  const columns = canvasElement.querySelectorAll<HTMLElement>('[data-comparison-width]');
  if (columns.length !== 2) throw new Error('두 너비의 예시가 모두 필요합니다.');
  for (const column of columns) {
    const bounds = column.getBoundingClientRect();
    for (const item of column.querySelectorAll(
      'input:not([type="hidden"]), button, p, .popdeal-marker',
    )) {
      const rect = item.getBoundingClientRect();
      if (rect.width && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1)) {
        throw new Error(
          `${column.dataset.comparisonWidth}px에서 ${item.tagName}이 영역을 벗어났습니다.`,
        );
      }
    }
  }
  return Array.from(columns);
}
