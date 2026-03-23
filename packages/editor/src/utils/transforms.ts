import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import type { IPElement } from '../types';

/** 빈 P 블록 생성 */
export const createEmptyParagraph = (): IPElement => ({
  type: 'p',
  children: [{ text: '' }],
});

/** 블록 삽입 후 해당 위치로 포커스 이동 */
export const insertBlockAndFocus = (editor: Editor & ReactEditor, block: IPElement, at: number) => {
  Transforms.insertNodes(editor, block, { at: [at] });
  Transforms.select(editor, Editor.start(editor, [at]));
  ReactEditor.focus(editor);
};
