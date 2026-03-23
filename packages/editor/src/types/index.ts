import type { TEditorElement, ICustomText } from '@pop-ui/editor-core';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

// core의 모든 타입 re-export
export * from '@pop-ui/editor-core';

// Slate 전용 타입
export type TCustomEditor = BaseEditor & ReactEditor & HistoryEditor;

// Slate 타입 확장
declare module 'slate' {
  // Slate module augmentation requires this exact interface name.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypes {
    Editor: TCustomEditor;
    Element: TEditorElement;
    Text: ICustomText;
  }
}
