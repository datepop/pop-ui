import { Editor } from 'slate';
import { type useSlate } from 'slate-react';

import type { ICustomText } from '../../types';

export type TMarkKey = 'bold' | 'italic' | 'underline';

export const getMarks = (editor: ReturnType<typeof useSlate>): Omit<ICustomText, 'text'> | null =>
  Editor.marks(editor) as Omit<ICustomText, 'text'> | null;

export const isActive = (editor: ReturnType<typeof useSlate>, key: TMarkKey): boolean =>
  !!getMarks(editor)?.[key];

export const toggleMark = (editor: ReturnType<typeof useSlate>, key: TMarkKey): void => {
  if (isActive(editor, key)) {
    Editor.removeMark(editor, key);
  } else {
    Editor.addMark(editor, key, true);
  }
};
