import {
  generateItemId,
  reorderItems,
  getPlaceholderCount,
} from '../shared/MultiItemInput/helpers';

export { reorderItems, getPlaceholderCount };

import type { ILottieInputItem } from './types';

export function isValidLottieJSON(json: unknown): boolean {
  if (!json || typeof json !== 'object' || Array.isArray(json)) return false;
  const j = json as Record<string, unknown>;
  return (
    'v' in j &&
    'fr' in j &&
    'ip' in j &&
    'op' in j &&
    'w' in j &&
    'h' in j &&
    'layers' in j &&
    Array.isArray(j.layers)
  );
}

export function parseLottieFile(file: File): Promise<Record<string, unknown> | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        resolve(isValidLottieJSON(json) ? (json as Record<string, unknown>) : null);
      } catch {
        resolve(null);
      }
    };
    reader.onerror = () => resolve(null);
    reader.readAsText(file);
  });
}

export function addItems(
  current: ILottieInputItem[],
  files: File[],
  maxLength?: number,
): ILottieInputItem[] {
  const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
  const remaining = maxLength != null ? maxLength - current.length : Infinity;
  const accepted = sorted.slice(0, remaining);
  const newItems: ILottieInputItem[] = accepted.map((file) => ({
    id: generateItemId(),
    file,
  }));
  return [...current, ...newItems];
}

export function deleteItem(current: ILottieInputItem[], id: string): ILottieInputItem[] {
  return current.filter((i) => i.id !== id);
}

export function addItemAtPosition(
  current: ILottieInputItem[],
  file: File,
  position: number,
): ILottieInputItem[] {
  const newItem: ILottieInputItem = {
    id: generateItemId(),
    file,
    position,
  };
  return [...current, newItem];
}
