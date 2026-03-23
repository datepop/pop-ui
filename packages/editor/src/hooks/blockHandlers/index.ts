import { blockquoteHandler } from './blockquoteHandler';
import { headingHandler } from './headingHandler';
import { listHandler } from './listHandler';
import { paragraphHandler } from './paragraphHandler';
import { voidHandler } from './voidHandler';

import type { IBlockKeyHandler } from './types';

/**
 * 블록 타입별 핸들러 맵
 */
export const blockHandlers: Record<string, IBlockKeyHandler> = {
  h1: headingHandler,
  h2: headingHandler,
  h3: headingHandler,
  ul: listHandler,
  ol: listHandler,
  li: listHandler,
  blockquote: blockquoteHandler,
  img: voidHandler,
  spot: voidHandler,
  hr: voidHandler,
  a: voidHandler,
  p: paragraphHandler,
};

export * from './types';
export * from './commonHandlers';
