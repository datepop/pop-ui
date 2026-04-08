import {
  generateItemId,
  reorderItems,
  getPlaceholderCount,
} from '../shared/MultiItemInput/helpers';

export { generateItemId, reorderItems, getPlaceholderCount };

import type { ImageInputItem } from './types';

export function addItems(
  current: ImageInputItem[],
  files: File[],
  maxLength?: number,
): ImageInputItem[] {
  const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
  const remaining = maxLength != null ? maxLength - current.length : Infinity;
  const accepted = sorted.slice(0, remaining);
  const newItems: ImageInputItem[] = accepted.map((file) => ({
    id: generateItemId(),
    file,
    url: URL.createObjectURL(file),
  }));
  return [...current, ...newItems];
}

export function deleteItem(current: ImageInputItem[], id: string): ImageInputItem[] {
  const item = current.find((i) => i.id === id);
  if (item?.url?.startsWith('blob:')) {
    URL.revokeObjectURL(item.url);
  }
  return current.filter((i) => i.id !== id);
}

export function replaceItem(current: ImageInputItem[], id: string, file: File): ImageInputItem[] {
  return current.map((item) => {
    if (item.id !== id) return item;
    if (item.url?.startsWith('blob:')) {
      URL.revokeObjectURL(item.url);
    }
    return { ...item, file, url: URL.createObjectURL(file) };
  });
}

export function cropItem(current: ImageInputItem[], id: string, file: File): ImageInputItem[] {
  return replaceItem(current, id, file);
}

export function revokeItemUrls(items: ImageInputItem[]): void {
  for (const item of items) {
    if (item.url?.startsWith('blob:')) {
      URL.revokeObjectURL(item.url);
    }
  }
}
