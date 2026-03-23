import { VOID_ELEMENTS, isElementOfType } from '@pop-ui/editor-core';
import { Editor, Element as SlateElement, Transforms } from 'slate';


import type { IBlockKeyHandler, IBlockHandlerContext, IHandlerResult } from './types';
import type { ICustomText } from '../../types';

/**
 * 빈 P 블록에서 Backspace 키 처리
 * - 이전 블록이 void element면 현재 블록만 삭제
 */
const handleBackspace = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, selection, currentPath, currentNode } = ctx;

  if (currentPath === 0) {
    return { handled: false };
  }

  const isEmptyP =
    SlateElement.isElement(currentNode) &&
    currentNode.type === 'p' &&
    currentNode.children.length === 1 &&
    (currentNode.children[0] as ICustomText).text === '';

  if (!isEmptyP) {
    return { handled: false };
  }

  const atStart = Editor.isStart(editor, selection.anchor, selection);
  if (!atStart) {
    return { handled: false };
  }

  const prevNode = editor.children[currentPath - 1];
  if (isElementOfType(prevNode, VOID_ELEMENTS)) {
    Transforms.removeNodes(editor, { at: [currentPath] });
    return { handled: true };
  }

  return { handled: false };
};

export const paragraphHandler: IBlockKeyHandler = {
  onBackspace: handleBackspace,
};
