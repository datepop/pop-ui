'use client';

import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { AnimateLayoutChanges } from '@dnd-kit/sortable';
import type { ReactNode } from 'react';

interface ISortableEmptySlotProps {
  id: string;
  children: ReactNode;
}

const animateLayoutChanges: AnimateLayoutChanges = (args) => {
  const { isSorting, wasDragging } = args;
  if (isSorting || wasDragging) return false;
  return defaultAnimateLayoutChanges(args);
};

export function SortableEmptySlot({ id, children }: ISortableEmptySlotProps) {
  const { setNodeRef, transform, transition, isOver } = useSortable({
    id,
    animateLayoutChanges,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isOver ? 0.7 : 1,
      }}
    >
      {children}
    </div>
  );
}
