import { Editor, Point, Range, Transforms } from 'slate';

import { createEmptyParagraph } from '../../utils/transforms';

import type { IBlockHandlerContext, IHandlerResult } from './types';

/**
 * 전체 선택 상태에서 Backspace/Delete 처리
 */
export const handleFullSelection = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, selection } = ctx;

  const [selStart, selEnd] = Range.edges(selection);

  const fullRange = Editor.range(editor, []);
  const [docStart, docEnd] = Range.edges(fullRange);

  const isFullSelection =
    Range.isExpanded(selection) && Point.equals(selStart, docStart) && Point.equals(selEnd, docEnd);

  if (isFullSelection) {
    Transforms.delete(editor, {
      at: {
        anchor: docStart,
        focus: docEnd,
      },
    });
    Transforms.insertNodes(editor, createEmptyParagraph(), { at: [0] });
    Transforms.select(editor, Editor.start(editor, [0]));
    return { handled: true };
  }

  return { handled: false };
};

/**
 * 첫 번째 블록 시작점에서 위로 이동 (제목으로)
 */
export const handleNavigateToTitleOnUp = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, selection, currentPath, onNavigateToTitle } = ctx;

  if (currentPath === 0 && onNavigateToTitle) {
    const atStart = Editor.isStart(editor, selection.anchor, selection);
    if (atStart) {
      onNavigateToTitle();
      return { handled: true };
    }
  }

  return { handled: false };
};

/**
 * 첫 번째 블록 시작점에서 Backspace 처리 (제목으로 이동)
 */
export const handleBackspaceAtFirstBlock = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, selection, currentPath, onNavigateToTitle } = ctx;

  if (currentPath === 0 && onNavigateToTitle) {
    const atStart = Editor.isStart(editor, selection.anchor, selection);
    if (atStart) {
      if (editor.children.length > 1) {
        Transforms.removeNodes(editor, { at: [0] });
      }
      onNavigateToTitle();
      return { handled: true };
    }
  }

  return { handled: false };
};
