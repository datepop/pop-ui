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
  if (maxLength != null && items.length >= maxLength) return 0;
  if (minLength != null && items.length < minLength) return minLength - items.length;
  return 1;
}
