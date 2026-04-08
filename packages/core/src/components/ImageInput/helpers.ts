import type { ImageInputItem } from './types';

export function generateItemId(): string {
  return crypto.randomUUID();
}

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

export function reorderItems(
  current: ImageInputItem[],
  fromIndex: number,
  toIndex: number,
): ImageInputItem[] {
  const result = [...current];
  const [moved] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, moved);
  return result;
}

export function getPlaceholderCount(
  items: ImageInputItem[],
  minLength?: number,
  maxLength?: number,
): number {
  if (minLength) {
    return Math.max(minLength - items.length, maxLength ? 0 : 1);
  }
  return !maxLength || items.length < maxLength ? 1 : 0;
}

export function revokeItemUrls(items: ImageInputItem[]): void {
  for (const item of items) {
    if (item.url?.startsWith('blob:')) {
      URL.revokeObjectURL(item.url);
    }
  }
}
