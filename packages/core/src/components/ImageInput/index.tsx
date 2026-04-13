'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Input } from '@mantine/core';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto } from '@pop-ui/foundation';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../Button';
import {
  addItemAtPosition,
  addItems,
  cropItem,
  deleteItem,
  replaceItem,
  revokeItemUrls,
} from './helpers';
import { ImageInputCropModal } from './ImageInputCropModal';
import styles from './styles.module.scss';
import { PlaceholderDropzone } from '../shared/MultiItemInput/Dropzone';
import { SortableEmptySlot } from '../shared/MultiItemInput/SortableEmptySlot';
import { TileShell } from '../shared/MultiItemInput/TileShell';
import { usePositionGrid } from '../shared/MultiItemInput/usePositionGrid';

import type { ImageInputAccept, ImageInputItem, ImageInputProps } from './types';

function toInputAccept(accept?: ImageInputAccept): string {
  if (!accept) return 'image/*';
  return accept.join(',');
}

// ─── Sortable image tile ──────────────────────────────────────────────────────

interface ITileProps {
  item: ImageInputItem;
  sortableId?: string;
  index: number;
  totalCount: number;
  width: number;
  height: number;
  accept?: ImageInputAccept;
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
  sortableId,
  index,
  totalCount,
  width,
  height,
  accept,
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
      id={sortableId ?? item.id}
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
      onFileDrop={(file) => {
        if (accept) {
          if (!accept.includes(file.type as ImageInputAccept[number])) return;
        } else {
          if (!file.type.startsWith('image/')) return;
        }
        onReplace(item.id, file);
      }}
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
        accept={toInputAccept(accept)}
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
  accept,
  length,
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
  if (
    process.env.NODE_ENV !== 'production' &&
    length != null &&
    (minLength != null || maxLength != null)
  ) {
    console.warn(
      'ImageInput: length와 minLength/maxLength가 동시에 지정되었습니다. length가 우선 적용됩니다.',
    );
  }

  const {
    isPositionMode,
    resolvedMaxLength,
    placeholderCount,
    slotIds,
    sortableItems,
    sensors,
    handleDragEnd,
    getMetaIndex,
  } = usePositionGrid({ value, length, minLength, maxLength, onChange });

  const isError = !!errorMsg;
  const [editingItem, setEditingItem] = useState<ImageInputItem | null>(null);

  // Revoke all blob URLs on unmount
  const latestValueRef = useRef(value);
  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);
  useEffect(() => {
    return () => revokeItemUrls(latestValueRef.current);
  }, []);

  const handleDrop = (files: File[]) => {
    if (readOnly) return;
    const prevLength = value.length;
    const next = addItems(value, files, resolvedMaxLength);
    if (next.length === prevLength) return;
    onChange?.(next, {
      action: 'create',
      itemId: next[prevLength].id,
      index: prevLength,
    });
  };

  const handlePositionDrop = (position: number, files: File[]) => {
    if (readOnly) return;
    const file = files[0];
    if (!file) return;
    const next = addItemAtPosition(value, file, position);
    onChange?.(next, {
      action: 'create',
      itemId: next[next.length - 1].id,
      index: position,
    });
  };

  const handleDelete = (id: string) => {
    if (readOnly) return;
    const index = getMetaIndex(id);
    const next = deleteItem(value, id);
    onChange?.(next, { action: 'delete', itemId: id, index });
  };

  const handleReplace = (id: string, file: File) => {
    if (readOnly) return;
    const index = getMetaIndex(id);
    const next = replaceItem(value, id, file);
    onChange?.(next, { action: 'replace', itemId: id, index });
  };

  const handleCropSubmit = (file: File) => {
    if (!editingItem) return;
    const id = editingItem.id;
    const index = getMetaIndex(id);
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
        <SortableContext items={sortableItems} strategy={rectSortingStrategy}>
          <div className={styles.Container} style={{ gap }}>
            {isPositionMode ? (
              Array.from({ length: resolvedMaxLength! }, (_, pos) => {
                const slotId = slotIds[pos];
                const item = value.find((v) => v.position === pos);
                return item ? (
                  <ImageTile
                    key={slotId}
                    item={item}
                    sortableId={slotId}
                    index={pos}
                    totalCount={resolvedMaxLength!}
                    width={width}
                    height={height}
                    accept={accept}
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
                ) : (
                  !readOnly && (
                    <SortableEmptySlot key={slotId} id={slotId}>
                      <PlaceholderDropzone
                        onDrop={(files) => handlePositionDrop(pos, files)}
                        accept={accept ?? IMAGE_MIME_TYPE}
                        multiple={false}
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
                            {resolvedPlaceholder(pos)}
                          </div>
                        )}
                      </PlaceholderDropzone>
                    </SortableEmptySlot>
                  )
                );
              })
            ) : (
              <>
                {value.map((item, index) => (
                  <ImageTile
                    key={item.id}
                    item={item}
                    index={index}
                    totalCount={value.length}
                    width={width}
                    height={height}
                    accept={accept}
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
                      accept={accept ?? IMAGE_MIME_TYPE}
                      multiple={resolvedMaxLength !== 1}
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
              </>
            )}
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
