import type { TEditorElement } from '../../types';
import type { Editor, Range } from 'slate';
import type { ReactEditor } from 'slate-react';

/**
 * 블록 핸들러 컨텍스트 (모든 핸들러가 받는 공통 정보)
 */
export interface IBlockHandlerContext {
  editor: Editor & ReactEditor;
  event: React.KeyboardEvent;
  selection: Range;
  currentPath: number;
  currentNode: TEditorElement;
  onNavigateToTitle?: () => void;
}

/**
 * 핸들러 결과
 */
export interface IHandlerResult {
  handled: boolean;
}

/**
 * 블록별 키 핸들러 인터페이스
 */
export interface IBlockKeyHandler {
  onEnter?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onBackspace?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onDelete?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onArrowUp?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onArrowDown?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onArrowLeft?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onArrowRight?: (ctx: IBlockHandlerContext) => IHandlerResult;
}
