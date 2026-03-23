import { isDraggableElement } from '@pop-ui/editor-core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Element as SlateElement, Transforms, type Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import type { TCustomEditor } from '../../types';

const BLOCK_DND_MIME = 'application/x-poplog-block';

const EDGE_SCROLL_ZONE_PX = 80;
const EDGE_SCROLL_MAX_SPEED = 10;

function getEdgeScrollDelta(
  clientY: number,
  viewportHeight: number,
  zoneHeight: number,
  maxSpeed: number,
): number {
  if (clientY < zoneHeight) {
    const ratio = 1 - clientY / zoneHeight;
    return -Math.min(maxSpeed, ratio * maxSpeed);
  }
  if (clientY > viewportHeight - zoneHeight) {
    const ratio = (clientY - (viewportHeight - zoneHeight)) / zoneHeight;
    return Math.min(maxSpeed, ratio * maxSpeed);
  }
  return 0;
}

function applyOffscreenStyles(el: HTMLElement): void {
  el.style.position = 'fixed';
  el.style.top = '-9999px';
  el.style.left = '-9999px';
  el.style.zIndex = '-1';
  el.style.pointerEvents = 'none';
  el.style.opacity = '1';
}

function createCardDragImage(domNode: HTMLElement): HTMLElement {
  const el = document.createElement('div');
  Object.assign(el.style, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #eee',
    overflow: 'hidden',
  });
  const icon = domNode.querySelector('img, svg');
  if (icon) {
    const iconEl = icon.tagName === 'SVG' ? icon.parentElement! : icon;
    const iconCopy = iconEl.cloneNode(true) as HTMLElement;
    iconCopy.style.margin = '0';
    iconCopy.style.padding = '0';
    el.appendChild(iconCopy);
  }
  applyOffscreenStyles(el);
  return el;
}

function createHrDragImage(): HTMLElement {
  const el = document.createElement('div');
  Object.assign(el.style, { width: '100px', padding: '8px 0' });
  const line = document.createElement('hr');
  Object.assign(line.style, { border: 'none', borderTop: '1px solid #ddd', margin: '0' });
  el.appendChild(line);
  applyOffscreenStyles(el);
  return el;
}

function createImgDragImage(domNode: HTMLElement): HTMLElement {
  const el = document.createElement('div');
  Object.assign(el.style, { maxWidth: '100px', borderRadius: '8px', overflow: 'hidden' });
  const img = domNode.querySelector('img');
  if (img) {
    const imgCopy = document.createElement('img');
    imgCopy.src = img.src;
    Object.assign(imgCopy.style, { width: '100%', height: 'auto', display: 'block' });
    el.appendChild(imgCopy);
  }
  applyOffscreenStyles(el);
  return el;
}

interface IDragState {
  isDragging: boolean;
  dragSourceIndex: number | null;
  dropTargetIndex: number | null;
  dropPosition: 'before' | 'after';
}

const initialDragState: IDragState = {
  isDragging: false,
  dragSourceIndex: null,
  dropTargetIndex: null,
  dropPosition: 'after',
};

export const useDragAndDrop = (editor: TCustomEditor) => {
  const [dragState, setDragState] = useState<IDragState>(initialDragState);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const dragImageRef = useRef<HTMLElement | null>(null);
  const lastDragClientYRef = useRef<number | null>(null);
  const rafIdRef = useRef<number>(0);
  const isEdgeScrollActiveRef = useRef(false);
  const documentDragoverHandlerRef = useRef<((e: DragEvent) => void) | null>(null);

  const cleanupDragImage = useCallback(() => {
    if (dragImageRef.current) {
      dragImageRef.current.remove();
      dragImageRef.current = null;
    }
  }, []);

  const stopEdgeScroll = useCallback(() => {
    isEdgeScrollActiveRef.current = false;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
    }
    const handler = documentDragoverHandlerRef.current;
    if (handler) {
      document.removeEventListener('dragover', handler, true);
      documentDragoverHandlerRef.current = null;
    }
    lastDragClientYRef.current = null;
  }, []);

  const resetDragState = useCallback(() => {
    stopEdgeScroll();
    cleanupDragImage();
    setDragState(initialDragState);
  }, [cleanupDragImage, stopEdgeScroll]);

  // Ensure cleanup on unmount — prevents memory leak if component
  // unmounts during an active drag operation
  useEffect(() => {
    return () => {
      stopEdgeScroll();
      cleanupDragImage();
    };
  }, [stopEdgeScroll, cleanupDragImage]);

  const getDragAttributes = useCallback(
    (blockIndex: number, elementType: string) => {
      const isDraggable = isDraggableElement(elementType);

      const dropHandlers = {
        onDragOver: (e: React.DragEvent) => {
          if (!e.dataTransfer.types.includes(BLOCK_DND_MIME)) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          const rect = e.currentTarget.getBoundingClientRect();
          const position: 'before' | 'after' =
            e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
          setDragState((prev) => {
            if (prev.dropTargetIndex === blockIndex && prev.dropPosition === position) return prev;
            return { ...prev, dropTargetIndex: blockIndex, dropPosition: position };
          });
        },
        onDragLeave: (e: React.DragEvent) => {
          if (e.currentTarget.contains(e.relatedTarget as Node)) return;
          setDragState((prev) => {
            if (prev.dropTargetIndex !== blockIndex) return prev;
            return { ...prev, dropTargetIndex: null };
          });
        },
        onDrop: (e: React.DragEvent) => {
          if (!e.dataTransfer.types.includes(BLOCK_DND_MIME)) return;
          e.preventDefault();
          e.stopPropagation();
          const fromIndex = parseInt(e.dataTransfer.getData(BLOCK_DND_MIME), 10);
          if (isNaN(fromIndex)) {
            resetDragState();
            return;
          }
          const rect = e.currentTarget.getBoundingClientRect();
          const position = e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
          let toIndex = position === 'before' ? blockIndex : blockIndex + 1;
          if (fromIndex === toIndex || fromIndex + 1 === toIndex) {
            resetDragState();
            return;
          }
          if (fromIndex < toIndex) toIndex -= 1;
          if (toIndex >= 0 && toIndex < editor.children.length) {
            Transforms.moveNodes(editor, { at: [fromIndex], to: [toIndex] });
          }
          resetDragState();
        },
      };

      if (!isDraggable) return dropHandlers;

      return {
        draggable: true,
        onDragStart: (e: React.DragEvent) => {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData(BLOCK_DND_MIME, String(blockIndex));
          try {
            const node = editor.children[blockIndex];
            const nodeType = SlateElement.isElement(node) ? (node.type as string) : '';
            const domNode = ReactEditor.toDOMNode(editor, node);
            cleanupDragImage();
            let dragImage: HTMLElement;
            if (nodeType === 'spot' || nodeType === 'a') dragImage = createCardDragImage(domNode);
            else if (nodeType === 'hr') dragImage = createHrDragImage();
            else dragImage = createImgDragImage(domNode);
            document.body.appendChild(dragImage);
            dragImageRef.current = dragImage;
            e.dataTransfer.setDragImage(dragImage, 0, 0);
          } catch {
            /* 기본 드래그 이미지 사용 */
          }
          setDragState({
            isDragging: true,
            dragSourceIndex: blockIndex,
            dropTargetIndex: null,
            dropPosition: 'after',
          });
          lastDragClientYRef.current = e.clientY;
          const handleDocDragover = (ev: DragEvent) => {
            lastDragClientYRef.current = ev.clientY;
          };
          documentDragoverHandlerRef.current = handleDocDragover;
          document.addEventListener('dragover', handleDocDragover, true);
          isEdgeScrollActiveRef.current = true;
          const tick = () => {
            if (!isEdgeScrollActiveRef.current) return;
            const y = lastDragClientYRef.current;
            if (y !== null) {
              const delta = getEdgeScrollDelta(
                y,
                window.innerHeight,
                EDGE_SCROLL_ZONE_PX,
                EDGE_SCROLL_MAX_SPEED,
              );
              if (delta !== 0) window.scrollBy(0, delta);
            }
            rafIdRef.current = requestAnimationFrame(tick);
          };
          rafIdRef.current = requestAnimationFrame(tick);
        },
        onDragEnd: () => resetDragState(),
        ...dropHandlers,
        style: {
          cursor: dragState.isDragging ? 'grabbing' : 'grab',
          ...(dragState.isDragging && dragState.dragSourceIndex === blockIndex
            ? { opacity: 0.4 }
            : {}),
        },
      };
    },
    [editor, dragState.isDragging, dragState.dragSourceIndex, resetDragState, cleanupDragImage],
  );

  const getDropIndicatorPosition = useCallback((): {
    top: number;
    left: number;
    width: number;
  } | null => {
    if (
      !dragState.isDragging ||
      dragState.dropTargetIndex === null ||
      dragState.dragSourceIndex === null
    ) {
      return null;
    }
    const { dropTargetIndex, dropPosition, dragSourceIndex } = dragState;
    const effectiveIndex = dropPosition === 'before' ? dropTargetIndex : dropTargetIndex + 1;
    if (effectiveIndex === dragSourceIndex || effectiveIndex === dragSourceIndex + 1) return null;
    try {
      const targetNode = editor.children[dropTargetIndex];
      if (!targetNode) return null;
      const domNode = ReactEditor.toDOMNode(editor, targetNode);
      if (!domNode || !editorWrapperRef.current) return null;
      const wrapperRect = editorWrapperRef.current.getBoundingClientRect();
      const targetRect = domNode.getBoundingClientRect();
      let top: number;
      if (dropPosition === 'before') {
        const prevNode = editor.children[dropTargetIndex - 1];
        if (prevNode) {
          const prevRect = ReactEditor.toDOMNode(editor, prevNode).getBoundingClientRect();
          top = (prevRect.bottom + targetRect.top) / 2 - wrapperRect.top;
        } else {
          top = targetRect.top - wrapperRect.top;
        }
      } else {
        const nextNode = editor.children[dropTargetIndex + 1];
        if (nextNode) {
          const nextRect = ReactEditor.toDOMNode(editor, nextNode).getBoundingClientRect();
          top = (targetRect.bottom + nextRect.top) / 2 - wrapperRect.top;
        } else {
          top = targetRect.bottom - wrapperRect.top;
        }
      }
      return { top, left: targetRect.left - wrapperRect.left, width: targetRect.width };
    } catch {
      return null;
    }
  }, [editor, dragState]);

  return { dragState, editorWrapperRef, getDragAttributes, getDropIndicatorPosition };
};

// re-export Editor type used in useDragAndDrop consumers
export type { Editor };
