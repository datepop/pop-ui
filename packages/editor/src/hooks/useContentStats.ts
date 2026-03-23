import { computeContentStats } from '@pop-ui/editor-core';
import { useMemo } from 'react';

import type { TEditorElement, IContentStats } from '../types';

/**
 * 콘텐츠 통계 훅 (메모이제이션 포함)
 */
export const useContentStats = (content: TEditorElement[]): IContentStats => {
  return useMemo(() => computeContentStats(content), [content]);
};
