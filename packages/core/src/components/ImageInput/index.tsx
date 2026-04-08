'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Input } from '@mantine/core';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto } from '@pop-ui/foundation';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../Button';
import {
  addItems,
  cropItem,
  deleteItem,
  getPlaceholderCount,
  replaceItem,
  reorderItems,
  revokeItemUrls,
} from './helpers';
import { ImageInputCropModal } from './ImageInputCropModal';
import styles from './styles.module.scss';
import { PlaceholderDropzone } from '../shared/MultiItemInput/Dropzone';
import { TileShell } from '../shared/MultiItemInput/TileShell';
import { useSortableGrid } from '../shared/MultiItemInput/useSortableGrid';

import type { ImageInputItem, ImageInputProps } from './types';

// ─── Sortable image tile ──────────────────────────────────────────────────────

interface ITileProps {
  item: ImageInputItem;
  index: number;
  totalCount: number;
  width: number;
  height: number;
  canDelete: boolean;
  hasLink: boolean;
  hasEdit: boolean;
  readOnly: boolean;
  isLoading?: boolean;
  onLinkClick?: (item: ImageInputItem) => void;
  onDelete: (id: string) => void;
  onReplace: (id: string, file: File) => void;
  onEdit: (item: ImageInputItem) => void;
}

function ImageTile({
  item,
  index,
  totalCount,
  width,
  height,
  canDelete,
  hasLink,
  hasEdit,
  readOnly,
  isLoading,
  onLinkClick,
  onDelete,
  onReplace,
  onEdit,
}: ITileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <TileShell
      id={item.id}
      totalCount={totalCount}
      width={width}
      height={height}
      readOnly={readOnly}
      isLoading={isLoading}
      itemIsLoading={item.isLoading}
      canDelete={canDelete}
      hasLink={hasLink}
      linkUrl={item.url}
      onLinkClick={onLinkClick ? () => onLinkClick(item) : undefined}
      onDelete={() => onDelete(item.id)}
      deleteAriaLabel="이미지 삭제"
      onTileClick={() => fileInputRef.current?.click()}
      actionBarExtra={
        !readOnly && hasEdit ? (
          <Button
            variant="basic"
            size="sm"
            aria-label="이미지 편집"
            className={styles.EditButton}
            onClick={() => onEdit(item)}
          >
            편집
          </Button>
        ) : undefined
      }
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onReplace(item.id, file);
          e.target.value = '';
        }}
      />
      <img
        src={item.url}
        alt={item.file?.name ?? `이미지 ${index + 1}`}
        className={styles.TileImage}
      />
    </TileShell>
  );
}

// ─── ImageInput ───────────────────────────────────────────────────────────────

export const ImageInput = ({
  value = [],
  onChange,
  width = 160,
  height = 200,
  placeholder = '이미지를 넣어주세요',
  hasIcon = true,
  hasLink = false,
  onLinkClick,
  hasEdit = false,
  canDelete = true,
  minLength,
  maxLength,
  errorMsg,
  isLoading,
  readOnly,
  gap = 8,
}: ImageInputProps) => {
  const isError = !!errorMsg;
  const placeholderCount = getPlaceholderCount(value, minLength, maxLength);
  const [editingItem, setEditingItem] = useState<ImageInputItem | null>(null);

  // Revoke all blob URLs on unmount
  useEffect(() => {
    return () => revokeItemUrls(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { sensors, handleDragEnd } = useSortableGrid({
    items: value,
    onReorder: (fromIndex, toIndex) => {
      const next = reorderItems(value, fromIndex, toIndex);
      const active = value[fromIndex];
      onChange?.(next, {
        action: 'reorder',
        itemId: active.id,
        index: toIndex,
        previousIndex: fromIndex,
        nextIndex: toIndex,
      });
    },
  });

  const handleDrop = (files: File[]) => {
    if (readOnly) return;
    const prevLength = value.length;
    const next = addItems(value, files, maxLength);
    if (next.length === prevLength) return;
    onChange?.(next, {
      action: 'create',
      itemId: next[prevLength].id,
      index: prevLength,
    });
  };

  const handleDelete = (id: string) => {
    if (readOnly) return;
    const index = value.findIndex((i) => i.id === id);
    const next = deleteItem(value, id);
    onChange?.(next, { action: 'delete', itemId: id, index });
  };

  const handleReplace = (id: string, file: File) => {
    if (readOnly) return;
    const index = value.findIndex((i) => i.id === id);
    const next = replaceItem(value, id, file);
    onChange?.(next, { action: 'replace', itemId: id, index });
  };

  const handleCropSubmit = (file: File) => {
    if (!editingItem) return;
    const id = editingItem.id;
    const index = value.findIndex((i) => i.id === id);
    const next = cropItem(value, id, file);
    setEditingItem(null);
    onChange?.(next, { action: 'crop', itemId: id, index });
  };

  const resolvedPlaceholder = (index: number) => {
    const text = typeof placeholder === 'function' ? placeholder(index) : placeholder;
    if (typeof text !== 'string') return text;
    return text.split('\n').map((line, i) => <span key={i}>{line}</span>);
  };

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={value.map((i) => i.id)} strategy={rectSortingStrategy}>
          <div className={styles.Container} style={{ gap }}>
            {value.map((item, index) => (
              <ImageTile
                key={item.id}
                item={item}
                index={index}
                totalCount={value.length}
                width={width}
                height={height}
                canDelete={canDelete}
                hasLink={hasLink}
                hasEdit={hasEdit}
                readOnly={readOnly ?? false}
                isLoading={isLoading}
                onLinkClick={onLinkClick}
                onDelete={handleDelete}
                onReplace={handleReplace}
                onEdit={setEditingItem}
              />
            ))}

            {!readOnly &&
              Array.from({ length: placeholderCount }, (_, i) => (
                <PlaceholderDropzone
                  key={`placeholder-${i}`}
                  onDrop={handleDrop}
                  accept={IMAGE_MIME_TYPE}
                  multiple={maxLength !== 1}
                  isLoading={isLoading}
                  isError={isError}
                  width={width}
                  height={height}
                >
                  {hasIcon && <IconPhoto size={36} color={isError ? '#e03131' : '#07a3c6'} />}
                  {placeholder && (
                    <div
                      className={`${styles.PlaceholderText}${isError ? ` ${styles.PlaceholderTextError}` : ''}`}
                    >
                      {resolvedPlaceholder(i)}
                    </div>
                  )}
                </PlaceholderDropzone>
              ))}
          </div>
        </SortableContext>
      </DndContext>

      {isError && <Input.Error mt={8}>{errorMsg}</Input.Error>}

      {hasEdit && (
        <ImageInputCropModal
          item={editingItem}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSubmit={handleCropSubmit}
        />
      )}
    </div>
  );
};

export default ImageInput;
