import { VOID_ELEMENTS, isElementOfType } from '@pop-ui/editor-core';
import { Editor, Element as SlateElement, Transforms } from 'slate';

import { createEmptyParagraph, insertBlockAndFocus } from '../../utils/transforms';

import type { IBlockKeyHandler, IBlockHandlerContext, IHandlerResult } from './types';

/**
 * Void 블록에서 Enter 키 처리
 * - 아래에 텍스트 블록 추가
 */
const handleEnter = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, currentPath } = ctx;

  insertBlockAndFocus(editor, createEmptyParagraph(), currentPath + 1);

  return { handled: true };
};

/**
 * Void 블록에서 Backspace 키 처리
 * - 블록 삭제
 */
const handleBackspace = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, currentPath } = ctx;

  Transforms.removeNodes(editor, { at: [currentPath] });

  return { handled: true };
};

/**
 * Void 블록에서 Delete 키 처리
 * - 블록 삭제
 */
const handleDelete = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, currentPath } = ctx;

  Transforms.removeNodes(editor, { at: [currentPath] });

  return { handled: true };
};

/**
 * 왼쪽 화살표: void element 건너뛰기
 */
const handleArrowLeft = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, selection, currentPath } = ctx;

  const atStart = Editor.isStart(editor, selection.anchor, selection);
  if (!atStart || currentPath === 0) {
    return { handled: false };
  }

  let targetIndex = currentPath - 1;
  while (targetIndex >= 0) {
    const targetNode = editor.children[targetIndex];
    if (isElementOfType(targetNode, VOID_ELEMENTS)) {
      targetIndex--;
      continue;
    }
    if (SlateElement.isElement(targetNode)) {
      Transforms.select(editor, Editor.end(editor, [targetIndex]));
      return { handled: true };
    }
    break;
  }

  return { handled: false };
};

/**
 * 오른쪽 화살표: void element 건너뛰기
 */
const handleArrowRight = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, selection, currentPath } = ctx;

  const atEnd = Editor.isEnd(editor, selection.anchor, selection);
  if (!atEnd || currentPath >= editor.children.length - 1) {
    return { handled: false };
  }

  let targetIndex = currentPath + 1;
  while (targetIndex < editor.children.length) {
    const targetNode = editor.children[targetIndex];
    if (isElementOfType(targetNode, VOID_ELEMENTS)) {
      targetIndex++;
      continue;
    }
    if (SlateElement.isElement(targetNode)) {
      Transforms.select(editor, Editor.start(editor, [targetIndex]));
      return { handled: true };
    }
    break;
  }

  return { handled: false };
};

export const voidHandler: IBlockKeyHandler = {
  onEnter: handleEnter,
  onBackspace: handleBackspace,
  onDelete: handleDelete,
  onArrowLeft: handleArrowLeft,
  onArrowRight: handleArrowRight,
};
