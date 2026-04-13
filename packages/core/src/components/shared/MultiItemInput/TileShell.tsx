'use client';

import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Loader } from '@mantine/core';
import { ColorAqua500, IconDragMenu, IconXCircle } from '@pop-ui/foundation';
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
  itemIsLoading?: boolean;
  canDelete: boolean;
  hasLink: boolean;
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
  itemIsLoading,
  canDelete,
  hasLink,
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

  const handleDragOver = (e: React.DragEvent) => {
    if (!onFileDrop || readOnly || isLoading || itemIsLoading) return;
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    if (!onFileDrop || readOnly || isLoading || itemIsLoading) return;
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
    if (!onFileDrop || readOnly || isLoading || itemIsLoading) return;
    const file = e.dataTransfer.files[0];
    if (file) onFileDrop(file);
  };

  const animateLayoutChanges: AnimateLayoutChanges = (args) => {
    const { isSorting, wasDragging } = args;
    if (isSorting || wasDragging) return false;
    return defaultAnimateLayoutChanges(args);
  };

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: readOnly,
    animateLayoutChanges,
  });

  const showActionBar =
    (!readOnly && totalCount > 1) || (hasLink && !!linkUrl && !!onLinkClick) || !!actionBarExtra;

  const tileCursor = readOnly || isLoading || itemIsLoading || !onTileClick ? 'default' : 'pointer';

  return (
    <div
      ref={setNodeRef}
      className={styles.TileContainer}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      {!readOnly && canDelete && !isLoading && (
        <button
          type="button"
          className={styles.DeleteButton}
          onClick={onDelete}
          aria-label={deleteAriaLabel}
        >
          <IconXCircle size={24} />
        </button>
      )}

      <div
        className={`${styles.Tile}${isDragOver ? ` ${styles.TileDragOver}` : ''}`}
        style={{ width, height, cursor: tileCursor }}
        onClick={() => !readOnly && !isLoading && !itemIsLoading && onTileClick?.()}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children}
        {(isLoading || itemIsLoading) && (
          <div className={styles.LoadingOverlay}>
            <Loader size={width / 6} color={ColorAqua500} />
          </div>
        )}
      </div>

      {showActionBar && (
        <div className={styles.ActionBar}>
          {!readOnly && totalCount > 1 && (
            <button
              type="button"
              className={styles.DragHandle}
              {...attributes}
              {...listeners}
              aria-label="드래그로 순서 변경"
            >
              <IconDragMenu size={20} color="#808080" />
            </button>
          )}

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
