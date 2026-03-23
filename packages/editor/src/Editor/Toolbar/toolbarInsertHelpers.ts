import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import {
  type IH1Element,
  type IH2Element,
  type IH3Element,
  type IImgElement,
  type TCustomEditor,
  type TEditorElement,
  type THeadingLevel,
} from '../../types';
import { createEmptyParagraph } from '../../utils/transforms';
import { insertNodesWithFocus, prepareInsertPosition } from '../hooks/insertUtils';

type TFocusTarget = 'self' | 'child' | 'next';

// Lookup table — eliminates ternary chain + localises type assertions
export const HEADING_FACTORY: Record<THeadingLevel, () => IH1Element | IH2Element | IH3Element> = {
  h1: () => ({ type: 'h1', children: [{ text: '' }] }) as IH1Element,
  h2: () => ({ type: 'h2', children: [{ text: '' }] }) as IH2Element,
  h3: () => ({ type: 'h3', children: [{ text: '' }] }) as IH3Element,
};

export const insertBlock = (
  editor: TCustomEditor,
  node: TEditorElement,
  focusTarget: TFocusTarget = 'self',
): void => {
  const { insertAt, needsTrailingTextBlock } = prepareInsertPosition(editor);
  const nodes: TEditorElement[] = [node];
  if (needsTrailingTextBlock) nodes.push(createEmptyParagraph());
  Transforms.insertNodes(editor, nodes, { at: [insertAt] });

  if (focusTarget === 'child') {
    Transforms.select(editor, Editor.start(editor, [insertAt, 0]));
  } else if (focusTarget === 'next') {
    const nextIndex = insertAt + 1;
    if (nextIndex < editor.children.length) {
      Transforms.select(editor, Editor.start(editor, [nextIndex]));
    }
  } else {
    Transforms.select(editor, Editor.start(editor, [insertAt]));
  }

  ReactEditor.focus(editor);
};

export const insertImageUrls = (editor: TCustomEditor, urls: string[]): void => {
  const { insertAt, needsTrailingTextBlock } = prepareInsertPosition(editor);
  insertNodesWithFocus(
    editor,
    urls.map((src) => ({ type: 'img', src, children: [{ text: '' }] }) as IImgElement),
    insertAt,
    needsTrailingTextBlock,
  );
};
