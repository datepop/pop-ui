import { Element as SlateElement, Text as SlateText } from 'slate';
import { useFocused, ReactEditor, useSlateStatic, useSelected } from 'slate-react';

import { useComposition } from '../../contexts/CompositionContext';

import type { RenderElementProps } from 'slate-react';

/**
 * P 블록 렌더러 - 플레이스홀더 로직 포함
 */
export const PElement = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const { isComposing } = useComposition();

  const isEmpty =
    element.children.length < 1 ||
    (element.children.length === 1 &&
      SlateText.isText(element.children[0]) &&
      element.children[0].text === '');

  const isAllParagraphsEmpty = editor.children.every((node) => {
    if (SlateElement.isElement(node) && node.type === 'p') {
      return (
        node.children.length === 0 ||
        (node.children.length === 1 &&
          SlateText.isText(node.children[0]) &&
          node.children[0].text === '')
      );
    }
    return true;
  });

  const firstParagraphIndex = editor.children.findIndex(
    (node) => SlateElement.isElement(node) && node.type === 'p',
  );
  const path = ReactEditor.findPath(editor, element);
  const isFirstParagraph = path[0] === firstParagraphIndex;

  const showPlaceholder =
    ((isEmpty && focused && selected) ||
      (!focused && isFirstParagraph && isAllParagraphsEmpty && selected)) &&
    !isComposing;

  return (
    <p
      {...attributes}
      style={{
        position: 'relative',
        lineHeight: 'var(--editor-line-height)',
        marginTop: 0,
        marginBottom: 'var(--editor-block-spacing)',
      }}
    >
      {showPlaceholder && (
        <span
          contentEditable={false}
          style={{
            position: 'absolute',
            color: '#9CA3AF',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          내용을 입력해주세요
        </span>
      )}
      {children}
    </p>
  );
};
