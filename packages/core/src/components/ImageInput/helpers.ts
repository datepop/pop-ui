import {
  generateItemId,
  reorderItems,
  getPlaceholderCount,
  reorderItemPositions,
} from '../shared/MultiItemInput/helpers';

export { generateItemId, reorderItems, getPlaceholderCount, reorderItemPositions };

import type { IImageInputItem } from './types';

export function addItems(
  current: IImageInputItem[],
  files: File[],
  maxLength?: number,
): IImageInputItem[] {
  const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
  const remaining = maxLength != null ? maxLength - current.length : Infinity;
  const accepted = sorted.slice(0, remaining);
  const newItems: IImageInputItem[] = accepted.map((file) => ({
    id: generateItemId(),
    file,
    url: URL.createObjectURL(file),
  }));
  return [...current, ...newItems];
}

export function deleteItem(current: IImageInputItem[], id: string): IImageInputItem[] {
  const item = current.find((i) => i.id === id);
  if (item?.url?.startsWith('blob:')) {
    URL.revokeObjectURL(item.url);
  }
  return current.filter((i) => i.id !== id);
}

export function replaceItem(current: IImageInputItem[], id: string, file: File): IImageInputItem[] {
  return current.map((item) => {
    if (item.id !== id) return item;
    if (item.url?.startsWith('blob:')) {
      URL.revokeObjectURL(item.url);
    }
    return { ...item, file, url: URL.createObjectURL(file) };
  });
}

export function cropItem(current: IImageInputItem[], id: string, file: File): IImageInputItem[] {
  return replaceItem(current, id, file);
}

export function addItemAtPosition(
  current: IImageInputItem[],
  file: File,
  position: number,
): IImageInputItem[] {
  const newItem: IImageInputItem = {
    id: generateItemId(),
    file,
    url: URL.createObjectURL(file),
    position,
  };
  return [...current, newItem];
}

export function revokeItemUrls(items: IImageInputItem[]): void {
  for (const item of items) {
    if (item.url?.startsWith('blob:')) {
      URL.revokeObjectURL(item.url);
    }
  }
}
