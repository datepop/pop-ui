import { Editor, Element as SlateElement, Text as SlateText, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { createEmptyParagraph } from '../../utils/transforms';

import type { TCustomEditor, TEditorElement } from '../../types';

export const prepareInsertPosition = (
  editor: TCustomEditor,
): { insertAt: number; needsTrailingTextBlock: boolean } => {
  // Case 1: 선택 영역 없음 — 문서 끝에 삽입
  if (!editor.selection) {
    return { insertAt: editor.children.length, needsTrailingTextBlock: true };
  }

  const currentPath = editor.selection.anchor.path[0];
  const currentNode = editor.children[currentPath];

  // Case 2: 현재 블록이 p가 아님 (heading, list 등) — 다음 위치에 삽입
  if (!SlateElement.isElement(currentNode) || currentNode.type !== 'p') {
    return { insertAt: currentPath + 1, needsTrailingTextBlock: true };
  }

  const isEmpty =
    currentNode.children.length === 0 ||
    (currentNode.children.length === 1 &&
      SlateText.isText(currentNode.children[0]) &&
      currentNode.children[0].text === '');

  // Case 3: 빈 p 블록 — 대체 삽입 (빈 블록 제거 후 같은 위치)
  if (isEmpty) {
    Transforms.removeNodes(editor, { at: [currentPath] });
    return { insertAt: currentPath, needsTrailingTextBlock: true };
  }

  const { anchor } = editor.selection;
  const isAtStart = Editor.isStart(editor, anchor, [currentPath]);
  const isAtEnd = Editor.isEnd(editor, anchor, [currentPath]);

  // Case 4: p 블록 시작점 — 현재 위치 앞에 삽입, p가 뒤로 밀림
  if (isAtStart) return { insertAt: currentPath, needsTrailingTextBlock: false };
  // Case 5: p 블록 끝점 — 다음 위치에 삽입
  if (isAtEnd) return { insertAt: currentPath + 1, needsTrailingTextBlock: true };

  // Case 6: p 블록 중간 — split 후 사이에 삽입
  Transforms.splitNodes(editor, { at: editor.selection });
  return { insertAt: currentPath + 1, needsTrailingTextBlock: false };
};

export const insertNodesWithFocus = (
  editor: TCustomEditor,
  nodesToInsert: TEditorElement[],
  insertAt: number,
  needsTrailingTextBlock: boolean,
): void => {
  if (needsTrailingTextBlock) nodesToInsert.push(createEmptyParagraph());
  Transforms.insertNodes(editor, nodesToInsert, { at: [insertAt] });
  try {
    const focusIndex = insertAt + nodesToInsert.length - (needsTrailingTextBlock ? 1 : 0);
    if (focusIndex < editor.children.length) {
      Transforms.select(editor, Editor.start(editor, [focusIndex]));
      ReactEditor.focus(editor);
      setTimeout(() => {
        try {
          const node = editor.children[focusIndex];
          ReactEditor.toDOMNode(editor, node)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        } catch {
          /* ignore */
        }
      }, 100);
    }
  } catch {
    /* ignore */
  }
};
