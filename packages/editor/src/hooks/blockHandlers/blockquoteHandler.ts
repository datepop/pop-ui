import { Transforms } from 'slate';

import type { IBlockKeyHandler, IBlockHandlerContext, IHandlerResult } from './types';

/**
 * Blockquote 블록에서 Enter 키 처리
 * - soft break (줄바꿈) 삽입
 */
const handleEnter = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor } = ctx;

  Transforms.insertText(editor, '\n');

  return { handled: true };
};

export const blockquoteHandler: IBlockKeyHandler = {
  onEnter: handleEnter,
};
