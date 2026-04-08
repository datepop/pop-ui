'use client';

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input, Loader } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { ColorAqua500, IconDragMenu, IconPhoto, IconXCircle } from '@pop-ui/foundation';
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

import type { ImageInputItem, ImageInputProps } from './types';
import type { DragEndEvent } from '@dnd-kit/core';

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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: readOnly,
  });

  const showActionBar = !readOnly || (hasLink && !!onLinkClick && !!item.url);

  return (
    <div
      ref={setNodeRef}
      className={styles.ImageContainer}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      {/* 삭제 버튼 — ImageContainer 기준 우상단 */}
      {!readOnly && canDelete && !isLoading && (
        <button
          type="button"
          className={styles.DeleteButton}
          onClick={() => onDelete(item.id)}
          aria-label="이미지 삭제"
        >
          <IconXCircle size={24} />
        </button>
      )}

      {/* 이미지 영역 — 클릭 시 파일 교체 */}
      <div
        className={styles.Tile}
        style={{
          width,
          height,
          cursor: readOnly || isLoading || item.isLoading ? 'default' : 'pointer',
        }}
        onClick={() => !readOnly && !isLoading && !item.isLoading && fileInputRef.current?.click()}
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
        {(isLoading || item.isLoading) && (
          <div className={styles.LoadingOverlay}>
            <Loader size={width / 6} color={ColorAqua500} />
          </div>
        )}
      </div>

      {/* 액션바 — 이미지 아래 row (인하우스 ImageItemActionContainer) */}
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

          {hasLink && onLinkClick && item.url && (
            <button type="button" className={styles.LinkButton} onClick={() => onLinkClick(item)}>
              이미지 링크
            </button>
          )}

          {!readOnly && hasEdit && (
            <Button
              variant="basic"
              size="sm"
              aria-label="이미지 편집"
              className={styles.EditButton}
              onClick={() => onEdit(item)}
            >
              편집
            </Button>
          )}
        </div>
      )}
    </div>
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = value.findIndex((i) => i.id === active.id);
    const toIndex = value.findIndex((i) => i.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;
    const next = reorderItems(value, fromIndex, toIndex);
    onChange?.(next, {
      action: 'reorder',
      itemId: String(active.id),
      index: toIndex,
      previousIndex: fromIndex,
      nextIndex: toIndex,
    });
  };

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
                <Dropzone
                  key={`placeholder-${i}`}
                  onDrop={handleDrop}
                  accept={IMAGE_MIME_TYPE}
                  multiple={maxLength !== 1}
                  disabled={isLoading}
                  className={`${styles.Placeholder}${isError ? ` ${styles.PlaceholderError}` : ''}`}
                  style={{ width, height }}
                >
                  {hasIcon && <IconPhoto size={36} color={isError ? '#e03131' : '#07a3c6'} />}
                  {placeholder && (
                    <div
                      className={`${styles.PlaceholderText}${isError ? ` ${styles.PlaceholderTextError}` : ''}`}
                    >
                      {resolvedPlaceholder(i)}
                    </div>
                  )}
                </Dropzone>
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
