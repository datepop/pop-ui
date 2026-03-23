import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { createEmptyParagraph } from '../../utils/transforms';

import type { IBlockKeyHandler, IBlockHandlerContext, IHandlerResult } from './types';

/**
 * Heading 블록에서 Enter 키 처리
 * - 시작점: 위에 빈 p 블록 추가
 * - 끝점: 아래에 p 블록 추가
 * - 중간: split 후 아래 블록을 p로 변환
 */
const handleEnter = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, selection, currentPath } = ctx;

  const isAtStart = Editor.isStart(editor, selection.anchor, [currentPath]);
  const isAtEnd = Editor.isEnd(editor, selection.anchor, [currentPath]);

  if (isAtStart) {
    Transforms.insertNodes(editor, createEmptyParagraph(), { at: [currentPath] });
    Transforms.select(editor, Editor.start(editor, [currentPath]));
    Transforms.select(editor, Editor.start(editor, [currentPath + 1]));
    ReactEditor.focus(editor);
  } else if (isAtEnd) {
    Transforms.insertNodes(editor, createEmptyParagraph(), { at: [currentPath + 1] });
    Transforms.select(editor, Editor.start(editor, [currentPath + 1]));
    ReactEditor.focus(editor);
  } else {
    Transforms.splitNodes(editor, { always: true });
    Transforms.setNodes(editor, { type: 'p' }, { at: [currentPath + 1] });
    ReactEditor.focus(editor);
  }

  return { handled: true };
};

export const headingHandler: IBlockKeyHandler = {
  onEnter: handleEnter,
};
