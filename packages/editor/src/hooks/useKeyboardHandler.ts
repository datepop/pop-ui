import { isDraggableElement } from '@pop-ui/editor-core';
import { useCallback } from 'react';
import { Element as SlateElement, Transforms } from 'slate';

import {
  blockHandlers,
  handleFullSelection,
  handleNavigateToTitleOnUp,
  handleBackspaceAtFirstBlock,
  type IBlockHandlerContext,
  type IBlockKeyHandler,
} from './blockHandlers';

import type { TCustomEditor, IBlocksConfig } from '../types';

interface IUseKeyboardHandlerOptions {
  editor: TCustomEditor;
  enabledBlocks: IBlocksConfig;
  onNavigateToTitle?: () => void;
}

/**
 * enabledBlocks 설정에 따라 블록 핸들러 반환
 */
const getHandler = (type: string, enabledBlocks: IBlocksConfig): IBlockKeyHandler | undefined => {
  if (type === 'h1' || type === 'h2' || type === 'h3') {
    if (!enabledBlocks.heading) return undefined;
  }
  if (type === 'ul' || type === 'ol' || type === 'li') {
    if (!enabledBlocks.list) return undefined;
  }
  if (type === 'blockquote') {
    if (!enabledBlocks.blockquote) return undefined;
  }
  return blockHandlers[type];
};

/**
 * 키보드 네비게이션 핸들러 - 블록 타입별 핸들러를 조합하여 처리
 */
export const useKeyboardHandler = ({
  editor,
  enabledBlocks,
  onNavigateToTitle,
}: IUseKeyboardHandlerOptions) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.nativeEvent.isComposing) {
        return;
      }

      if (!editor.selection) return;

      const { selection } = editor;
      const currentPath = selection.anchor.path[0];
      const currentNode = editor.children[currentPath];

      if (!SlateElement.isElement(currentNode)) return;

      // Cmd+Shift+Arrow 블록 이동 (void 요소만)
      if ((event.metaKey || event.ctrlKey) && event.shiftKey) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          if (isDraggableElement(currentNode.type)) {
            event.preventDefault();
            const direction = event.key === 'ArrowUp' ? -1 : 1;
            const targetIndex = currentPath + direction;
            if (targetIndex >= 0 && targetIndex < editor.children.length) {
              Transforms.moveNodes(editor, { at: [currentPath], to: [targetIndex] });
              Transforms.select(editor, [targetIndex]);
            }
            return;
          }
        }
      }

      const ctx: IBlockHandlerContext = {
        editor,
        event,
        selection,
        currentPath,
        currentNode,
        onNavigateToTitle,
      };

      // Backspace/Delete 키 처리
      if (event.key === 'Backspace' || event.key === 'Delete') {
        const fullSelectionResult = handleFullSelection(ctx);
        if (fullSelectionResult.handled) {
          event.preventDefault();
          return;
        }
      }

      // Backspace 키 처리
      if (event.key === 'Backspace') {
        const backspaceAtFirstResult = handleBackspaceAtFirstBlock(ctx);
        if (backspaceAtFirstResult.handled) {
          event.preventDefault();
          return;
        }

        const handler = getHandler(currentNode.type, enabledBlocks);
        const result = handler?.onBackspace?.(ctx);
        if (result?.handled) {
          event.preventDefault();
          return;
        }
      }

      // Enter 키 처리
      if (event.key === 'Enter') {
        const handler = getHandler(currentNode.type, enabledBlocks);
        const result = handler?.onEnter?.(ctx);
        if (result?.handled) {
          event.preventDefault();
          return;
        }
      }

      // 화살표 키 처리 - 첫 번째 블록 시작점에서 위/왼쪽: 제목으로 이동
      if ((event.key === 'ArrowUp' || event.key === 'ArrowLeft') && currentPath === 0) {
        const navigateResult = handleNavigateToTitleOnUp(ctx);
        if (navigateResult.handled) {
          event.preventDefault();
          return;
        }
      }

      if (event.key === 'ArrowLeft') {
        const handler = getHandler(currentNode.type, enabledBlocks);
        const result = handler?.onArrowLeft?.(ctx);
        if (result?.handled) {
          event.preventDefault();
          return;
        }
      }

      if (event.key === 'ArrowRight') {
        const handler = getHandler(currentNode.type, enabledBlocks);
        const result = handler?.onArrowRight?.(ctx);
        if (result?.handled) {
          event.preventDefault();
          return;
        }
      }

      if (event.key === 'Delete') {
        const handler = getHandler(currentNode.type, enabledBlocks);
        const result = handler?.onDelete?.(ctx);
        if (result?.handled) {
          event.preventDefault();
          return;
        }
      }

      if (event.key === 'ArrowUp') {
        const handler = getHandler(currentNode.type, enabledBlocks);
        const result = handler?.onArrowUp?.(ctx);
        if (result?.handled) {
          event.preventDefault();
          return;
        }
      }

      if (event.key === 'ArrowDown') {
        const handler = getHandler(currentNode.type, enabledBlocks);
        const result = handler?.onArrowDown?.(ctx);
        if (result?.handled) {
          event.preventDefault();
          return;
        }
      }
    },
    [editor, enabledBlocks, onNavigateToTitle],
  );

  return { handleKeyDown };
};
