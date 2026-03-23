import { findLiEntry, findListEntry } from '@pop-ui/editor-core';
import { Editor, Path, Transforms } from 'slate';

import { createEmptyParagraph } from '../../utils/transforms';

import type { IBlockKeyHandler, IBlockHandlerContext, IHandlerResult } from './types';
import type { ICustomText, IPElement, TEditorElement } from '../../types';

/**
 * Li 블록에서 Enter 키 처리
 * - 빈 li: 리스트 탈출 (p 블록으로 변환)
 * - 내용 있는 li: split
 */
const handleEnter = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor } = ctx;

  const liEntry = findLiEntry(editor);
  if (!liEntry) {
    return { handled: false };
  }

  const [liNode, liPath] = liEntry;
  const isLiEmpty = liNode.children.length === 1 && (liNode.children[0] as ICustomText).text === '';

  if (isLiEmpty) {
    const listEntry = findListEntry(editor);
    if (listEntry) {
      const [listNode, listPath] = listEntry;
      const liIndex = liPath[liPath.length - 1];
      const beforeItems = listNode.children.slice(0, liIndex);
      const afterItems = listNode.children.slice(liIndex + 1);

      Transforms.removeNodes(editor, { at: listPath });

      const nodes: TEditorElement[] = [];
      if (beforeItems.length > 0)
        nodes.push({ ...listNode, children: beforeItems } as TEditorElement);
      nodes.push(createEmptyParagraph());
      if (afterItems.length > 0)
        nodes.push({ ...listNode, children: afterItems } as TEditorElement);

      Transforms.insertNodes(editor, nodes, { at: listPath });

      // 삽입된 빈 p의 위치: beforeItems가 있으면 listPath[0]+1, 없으면 listPath[0]
      const pIndex = listPath[0] + (beforeItems.length > 0 ? 1 : 0);
      Transforms.select(editor, Editor.start(editor, [pIndex]));
    }
  } else {
    Transforms.splitNodes(editor, { always: true });
  }

  return { handled: true };
};

/**
 * Li 블록에서 Backspace 키 처리
 * - 첫 li 시작점: p로 변환
 * - 다른 li 시작점: 이전 li와 병합
 */
const handleBackspace = (ctx: IBlockHandlerContext): IHandlerResult => {
  const { editor, selection } = ctx;

  const liEntry = findLiEntry(editor);
  if (!liEntry) {
    return { handled: false };
  }

  const [liNode, liPath] = liEntry;
  const isAtStart = Editor.isStart(editor, selection.anchor, liPath);

  if (!isAtStart) {
    return { handled: false };
  }

  const listEntry = findListEntry(editor);
  if (!listEntry) {
    return { handled: false };
  }

  const [listNode, listPath] = listEntry;
  const liIndex = liPath[liPath.length - 1];

  if (liIndex === 0) {
    const content = liNode.children as ICustomText[];
    const newParagraph: IPElement = {
      type: 'p',
      children: content.length > 0 ? content : [{ text: '' }],
    };

    if (listNode.children.length === 1) {
      Transforms.removeNodes(editor, { at: listPath });
      Transforms.insertNodes(editor, newParagraph, { at: listPath });
      Transforms.select(editor, Editor.start(editor, listPath));
    } else {
      Transforms.removeNodes(editor, { at: liPath });
      Transforms.insertNodes(editor, newParagraph, { at: listPath });
      Transforms.select(editor, Editor.start(editor, listPath));
    }
  } else {
    const prevLiPath = Path.previous(liPath);
    Transforms.select(editor, Editor.end(editor, prevLiPath));
    Transforms.mergeNodes(editor, { at: liPath });
  }

  return { handled: true };
};

export const listHandler: IBlockKeyHandler = {
  onEnter: handleEnter,
  onBackspace: handleBackspace,
};
