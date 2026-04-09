'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Input } from '@mantine/core';
import { IconPhoto } from '@pop-ui/foundation';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

import {
  addItemAtPosition,
  addItems,
  deleteItem,
  isValidLottieJSON,
  parseLottieFile,
} from './helpers';
import styles from './styles.module.scss';
import { PlaceholderDropzone } from '../shared/MultiItemInput/Dropzone';
import { SortableEmptySlot } from '../shared/MultiItemInput/SortableEmptySlot';
import { TileShell } from '../shared/MultiItemInput/TileShell';
import { usePositionGrid } from '../shared/MultiItemInput/usePositionGrid';
import { toast } from '../Toast';

import type { LottieInputItem, LottieInputProps } from './types';

// ─── LottieTile ───────────────────────────────────────────────────────────────

const LOTTIE_ACCEPT = { 'application/json': ['.json'] };

interface ILottieTileProps {
  item: LottieInputItem;
  sortableId?: string;
  totalCount: number;
  width: number;
  height: number;
  readOnly: boolean;
  isLoading?: boolean;
  canDelete: boolean;
  hasLink: boolean;
  onLinkClick?: (item: LottieInputItem) => void;
  onDelete: (id: string) => void;
}

function LottieTile({
  item,
  sortableId,
  totalCount,
  width,
  height,
  readOnly,
  isLoading,
  canDelete,
  hasLink,
  onLinkClick,
  onDelete,
}: ILottieTileProps) {
  // 비동기 로딩 결과를 key와 함께 추적 (effect 내 동기 setState 회피)
  const needsAsyncLoad = !item.animationData && !!(item.file || item.url);
  const asyncLoadKey = needsAsyncLoad
    ? `${item.id}|${item.file ? `${item.file.name}:${item.file.size}` : (item.url ?? '')}`
    : '';

  const [asyncResult, setAsyncResult] = useState<{
    key: string;
    data: Record<string, unknown> | null;
  }>({ key: '', data: null });

  // 동기 데이터(animationData) 우선, 없으면 비동기 로딩 결과 사용
  const resolvedData =
    item.animationData ?? (asyncResult.key === asyncLoadKey ? asyncResult.data : null);
  const tileLoading = !!asyncLoadKey && asyncResult.key !== asyncLoadKey;

  useEffect(() => {
    if (!asyncLoadKey) return;

    let cancelled = false;

    const load = item.file
      ? parseLottieFile(item.file)
      : fetch(item.url!)
          .then((res) => res.json())
          .then((json: unknown) =>
            isValidLottieJSON(json) ? (json as Record<string, unknown>) : null,
          );

    load
      .then((data) => {
        if (!cancelled) setAsyncResult({ key: asyncLoadKey, data });
      })
      .catch(() => {
        if (!cancelled) setAsyncResult({ key: asyncLoadKey, data: null });
      });

    return () => {
      cancelled = true;
    };
  }, [asyncLoadKey, item.file]);

  return (
    <TileShell
      id={sortableId ?? item.id}
      totalCount={totalCount}
      width={width}
      height={height}
      readOnly={readOnly}
      isLoading={isLoading}
      itemIsLoading={item.isLoading || tileLoading}
      canDelete={canDelete}
      hasLink={hasLink}
      linkUrl={item.url}
      onLinkClick={onLinkClick ? () => onLinkClick(item) : undefined}
      onDelete={() => onDelete(item.id)}
      deleteAriaLabel="Lottie 삭제"
    >
      {resolvedData ? (
        <Lottie
          animationData={resolvedData}
          loop
          autoplay
          style={{ width, height, display: 'block' }}
        />
      ) : (
        <div className={styles.Empty} style={{ width, height }} />
      )}
    </TileShell>
  );
}

// ─── LottieInput ──────────────────────────────────────────────────────────────

export const LottieInput = ({
  value = [],
  onChange,
  width = 160,
  height = 200,
  placeholder = 'Lottie JSON 파일을 넣어주세요',
  hasIcon = true,
  hasLink = false,
  onLinkClick,
  length,
  minLength,
  maxLength,
  errorMsg,
  isLoading,
  readOnly,
  gap = 8,
  canDelete = true,
}: LottieInputProps) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    length != null &&
    (minLength != null || maxLength != null)
  ) {
    console.warn(
      'LottieInput: length와 minLength/maxLength가 동시에 지정되었습니다. length가 우선 적용됩니다.',
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

  const handleDrop = async (files: File[]) => {
    if (readOnly) return;

    const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
    const results = await Promise.all(sorted.map(parseLottieFile));

    let invalidCount = 0;
    const validFiles = sorted.filter((_, i) => {
      if (results[i] !== null) return true;
      invalidCount++;
      return false;
    });

    if (invalidCount > 0) {
      toast({
        id: 'invalid-lottie-files',
        message:
          invalidCount === 1
            ? '유효하지 않은 Lottie JSON 파일입니다'
            : `${invalidCount}개의 파일이 유효하지 않은 Lottie JSON입니다`,
      });
    }

    if (validFiles.length === 0) return;

    const prevLength = value.length;
    const next = addItems(value, validFiles, resolvedMaxLength);
    if (next.length === prevLength) return;

    onChange?.(next, {
      action: 'create',
      itemId: next[prevLength].id,
      index: prevLength,
    });
  };

  const handlePositionDrop = async (position: number, files: File[]) => {
    if (readOnly) return;
    const file = files[0];
    if (!file) return;

    const data = await parseLottieFile(file);
    if (!data) {
      toast({
        id: 'invalid-lottie-files',
        message: '유효하지 않은 Lottie JSON 파일입니다',
      });
      return;
    }

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
                  <LottieTile
                    key={slotId}
                    item={item}
                    sortableId={slotId}
                    totalCount={resolvedMaxLength!}
                    width={width}
                    height={height}
                    readOnly={readOnly ?? false}
                    isLoading={isLoading}
                    canDelete={canDelete}
                    hasLink={hasLink}
                    onLinkClick={onLinkClick}
                    onDelete={handleDelete}
                  />
                ) : (
                  !readOnly && (
                    <SortableEmptySlot key={slotId} id={slotId}>
                      <PlaceholderDropzone
                        onDrop={(files) => handlePositionDrop(pos, files)}
                        accept={LOTTIE_ACCEPT}
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
                {value.map((item) => (
                  <LottieTile
                    key={item.id}
                    item={item}
                    totalCount={value.length}
                    width={width}
                    height={height}
                    readOnly={readOnly ?? false}
                    isLoading={isLoading}
                    canDelete={canDelete}
                    hasLink={hasLink}
                    onLinkClick={onLinkClick}
                    onDelete={handleDelete}
                  />
                ))}

                {!readOnly &&
                  Array.from({ length: placeholderCount }, (_, i) => (
                    <PlaceholderDropzone
                      key={`placeholder-${i}`}
                      onDrop={handleDrop}
                      accept={LOTTIE_ACCEPT}
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
    </div>
  );
};

export default LottieInput;
