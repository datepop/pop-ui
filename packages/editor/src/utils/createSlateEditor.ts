import { VOID_ELEMENTS, LIST_ELEMENTS, findLiEntry } from '@pop-ui/editor-core';
import { createEditor, Editor, Element as SlateElement, Range, Text as SlateText } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';


import type { TCustomEditor } from '../types';
import type { Node } from 'slate';

/**
 * 리스트 붙여넣기 정규화 플러그인
 * - 리스트 내에서 붙여넣기할 때 중첩 방지
 */
const withListPaste = <T extends Editor>(editor: T): T => {
  const { insertFragment } = editor;

  editor.insertFragment = (fragment: Node[]) => {
    // 현재 커서가 li 안에 있는지 확인
    const liEntry = findLiEntry(editor);

    if (liEntry) {
      // fragment가 단일 리스트(ul/ol)인 경우, li들만 추출하여 삽입
      const normalizedFragment = fragment.flatMap((node) => {
        if (
          SlateElement.isElement(node) &&
          LIST_ELEMENTS.includes(node.type as (typeof LIST_ELEMENTS)[number])
        ) {
          return node.children;
        }
        return node;
      });

      return insertFragment(normalizedFragment);
    }

    insertFragment(fragment);
  };

  return editor;
};

/**
 * href 마크 경계에서 새 텍스트를 입력할 때 href가 이어지지 않도록 분리하는 플러그인.
 * 커서가 href 텍스트의 시작 또는 끝에 위치하면 href 마크를 제거한 뒤 삽입한다.
 */
const withLinkBoundary = <T extends Editor>(editor: T): T => {
  const { insertText } = editor;

  editor.insertText = (text, options) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [node] = Editor.node(editor, selection.anchor);

      if (SlateText.isText(node) && (node as unknown as Record<string, unknown>).href) {
        const { offset } = selection.anchor;
        const isAtStart = offset === 0;
        const isAtEnd = offset === node.text.length;

        if (isAtStart || isAtEnd) {
          Editor.removeMark(editor, 'href');
        }
      }
    }

    insertText(text, options);
  };

  return editor;
};

/**
 * Slate 에디터 인스턴스를 생성하고 필요한 플러그인을 적용
 * - withReact: React 바인딩
 * - withHistory: Undo/Redo 지원
 * - withListPaste: 리스트 붙여넣기 정규화
 * - withLinkBoundary: href 마크 경계에서 leaf 분리
 * - isVoid 오버라이드: img, spot, hr, a를 void element로 설정
 */
export const createSlateEditor = (): TCustomEditor => {
  const baseEditor = withLinkBoundary(withListPaste(withHistory(withReact(createEditor()))));

  const { isVoid } = baseEditor;
  baseEditor.isVoid = (element) => {
    return VOID_ELEMENTS.includes(element.type as (typeof VOID_ELEMENTS)[number])
      ? true
      : isVoid(element);
  };

  return baseEditor;
};
