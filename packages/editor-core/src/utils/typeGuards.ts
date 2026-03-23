import { Editor, Element as SlateElement, type Node } from 'slate';

import { LIST_ELEMENTS } from './constants';

/** 해당 타입이 드래그 가능한 요소인지 확인 */
export const isDraggableElement = (type: string): boolean =>
  (['img', 'spot', 'hr', 'a'] as readonly string[]).includes(type);

/** 요소가 특정 타입들 중 하나인지 확인 */
export const isElementOfType = (node: Node, types: readonly string[]): boolean => {
  return SlateElement.isElement(node) && types.includes((node as unknown as { type: string }).type);
};

/** li 요소 찾기 */
export const findLiEntry = (editor: Editor) => {
  return Editor.above(editor, {
    match: (n) => SlateElement.isElement(n) && (n as unknown as { type: string }).type === 'li',
  });
};

/** ul/ol 요소 찾기 */
export const findListEntry = (editor: Editor) => {
  return Editor.above(editor, {
    match: (n) => isElementOfType(n, LIST_ELEMENTS),
  });
};
