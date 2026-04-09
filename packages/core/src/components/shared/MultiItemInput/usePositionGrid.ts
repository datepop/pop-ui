'use client';

import { getPlaceholderCount, reorderItemPositions, reorderItems } from './helpers';
import { useSortableGrid } from './useSortableGrid';

import type { DragEndEvent } from '@dnd-kit/core';

const SLOT_ID_PREFIX = '__slot-';

interface IUsePositionGridOptions<
  T extends { id: string; position?: number },
  Meta extends {
    action: string;
    itemId: string;
    index: number;
    previousIndex?: number;
    nextIndex?: number;
  },
> {
  value: T[];
  length?: number;
  minLength?: number;
  maxLength?: number;
  onChange?: (next: T[], meta: Meta) => void;
}

export function usePositionGrid<
  T extends { id: string; position?: number },
  Meta extends {
    action: string;
    itemId: string;
    index: number;
    previousIndex?: number;
    nextIndex?: number;
  } = {
    action: string;
    itemId: string;
    index: number;
    previousIndex?: number;
    nextIndex?: number;
  },
>({ value, length, minLength, maxLength, onChange }: IUsePositionGridOptions<T, Meta>) {
  const resolvedMinLength = length ?? minLength;
  const resolvedMaxLength = length ?? maxLength;
  const isPositionMode =
    resolvedMinLength != null &&
    resolvedMaxLength != null &&
    resolvedMinLength === resolvedMaxLength;

  const placeholderCount = isPositionMode
    ? 0
    : getPlaceholderCount(value, resolvedMinLength, resolvedMaxLength);

  // position 모드: 모든 슬롯(빈 포함)에 안정적인 ID 부여
  const slotIds = isPositionMode
    ? Array.from({ length: resolvedMaxLength! }, (_, pos) => `${SLOT_ID_PREFIX}${pos}`)
    : [];

  const sortableItems = isPositionMode ? slotIds : value.map((i) => i.id);

  // stack 모드용 드래그 핸들러
  const { sensors, handleDragEnd: stackHandleDragEnd } = useSortableGrid({
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
      } as Meta);
    },
  });

  // position 모드용 드래그 핸들러
  const handlePositionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromPos = Number(String(active.id).replace(SLOT_ID_PREFIX, ''));
    const toPos = Number(String(over.id).replace(SLOT_ID_PREFIX, ''));
    const fromItem = value.find((v) => v.position === fromPos);
    if (!fromItem) return;
    const next = reorderItemPositions(value, fromPos, toPos);
    onChange?.(next, {
      action: 'reorder',
      itemId: fromItem.id,
      index: toPos,
      previousIndex: fromPos,
      nextIndex: toPos,
    } as Meta);
  };

  const handleDragEnd = isPositionMode ? handlePositionDragEnd : stackHandleDragEnd;

  // meta.index 계산: position 모드에서는 item.position, stack 모드에서는 배열 인덱스
  const getMetaIndex = (id: string): number => {
    const item = value.find((i) => i.id === id);
    if (isPositionMode && item) return item.position ?? 0;
    return value.findIndex((i) => i.id === id);
  };

  return {
    isPositionMode,
    resolvedMinLength,
    resolvedMaxLength,
    placeholderCount,
    slotIds,
    sortableItems,
    sensors,
    handleDragEnd,
    getMetaIndex,
  };
}
