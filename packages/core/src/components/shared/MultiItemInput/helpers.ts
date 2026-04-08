export function generateItemId(): string {
  return crypto.randomUUID();
}

export function reorderItems<T>(current: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...current];
  const [moved] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, moved);
  return result;
}

export function getPlaceholderCount(
  items: { id: string }[],
  minLength?: number,
  maxLength?: number,
): number {
  if (minLength) {
    return Math.max(minLength - items.length, maxLength ? 0 : 1);
  }
  return !maxLength || items.length < maxLength ? 1 : 0;
}
