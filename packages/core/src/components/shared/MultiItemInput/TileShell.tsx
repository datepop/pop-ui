'use client';

import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Loader } from '@mantine/core';
import { ColorAqua500, ColorGray600, IconDragMenu, IconXCircle } from '@pop-ui/foundation';
import { useState } from 'react';

import styles from './styles.module.scss';

import type { AnimateLayoutChanges } from '@dnd-kit/sortable';
import type { ReactNode } from 'react';

interface ITileShellProps {
  id: string;
  totalCount: number;
  width: number;
  height: number;
  readOnly: boolean;
  isLoading?: boolean;
  isPreviewLoading?: boolean;
  canDelete: boolean;
  hasLink: boolean;
  isDragHandleOverlay?: boolean;
  linkUrl?: string;
  onLinkClick?: () => void;
  onDelete: () => void;
  deleteAriaLabel?: string;
  actionBarExtra?: ReactNode;
  onTileClick?: () => void;
  onFileDrop?: (file: File) => void;
  children: ReactNode;
}

export function TileShell({
  id,
  totalCount,
  width,
  height,
  readOnly,
  isLoading,
  isPreviewLoading,
  canDelete,
  hasLink,
  isDragHandleOverlay = false,
  linkUrl,
  onLinkClick,
  onDelete,
  deleteAriaLabel = '삭제',
  actionBarExtra,
  onTileClick,
  onFileDrop,
  children,
}: ITileShellProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const editLocked = readOnly || Boolean(isLoading);

  const handleDragOver = (e: React.DragEvent) => {
    if (!onFileDrop || editLocked) return;
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    if (!onFileDrop || editLocked) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!onFileDrop || editLocked) return;
    const file = e.dataTransfer.files[0];
    if (file) onFileDrop(file);
  };

  const animateLayoutChanges: AnimateLayoutChanges = (args) => {
    const { isSorting, wasDragging } = args;
    if (isSorting || wasDragging) return false;
    return defaultAnimateLayoutChanges(args);
  };

  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: { draggable: editLocked, droppable: editLocked },
    animateLayoutChanges,
  });

  const dragHandle = !readOnly && totalCount > 1 && (
    <button
      type="button"
      className={isDragHandleOverlay ? styles.DragHandleOverlay : styles.DragHandle}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label="드래그로 순서 변경"
      disabled={editLocked}
      onClick={isDragHandleOverlay ? (event) => event.stopPropagation() : undefined}
    >
      <IconDragMenu size={20} color={ColorGray600} />
    </button>
  );
  const showActionBar =
    (!isDragHandleOverlay && !!dragHandle) ||
    (hasLink && !!linkUrl && !!onLinkClick) ||
    !!actionBarExtra;

  const tileCursor = editLocked || !onTileClick ? 'default' : 'pointer';

  return (
    <div
      ref={setNodeRef}
      className={styles.TileContainer}
      style={{
        transform: editLocked ? undefined : CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      {!readOnly && canDelete && (
        <button
          type="button"
          className={styles.DeleteButton}
          disabled={isLoading}
          onClick={onDelete}
          aria-label={deleteAriaLabel}
        >
          <IconXCircle size={24} />
        </button>
      )}

      <div
        className={`${styles.Tile}${isDragOver ? ` ${styles.TileDragOver}` : ''}`}
        style={{ width, height, cursor: tileCursor }}
        onClick={editLocked ? undefined : onTileClick}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children}
        {isDragHandleOverlay && dragHandle}
        {(isLoading || isPreviewLoading) && (
          <div className={styles.LoadingOverlay}>
            <Loader size={width / 6} color={ColorAqua500} />
          </div>
        )}
      </div>

      {showActionBar && (
        <div className={styles.ActionBar}>
          {!isDragHandleOverlay && dragHandle}

          {hasLink && linkUrl && onLinkClick && (
            <button type="button" className={styles.LinkButton} onClick={onLinkClick}>
              링크
            </button>
          )}

          {actionBarExtra}
        </div>
      )}
    </div>
  );
}
