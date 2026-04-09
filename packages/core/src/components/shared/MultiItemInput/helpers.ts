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

export function addItemAtPosition<T extends { id: string }>(
  current: T[],
  newItem: Omit<T, 'position'>,
  position: number,
): (T & { position: number })[] {
  return [
    ...(current as (T & { position: number })[]),
    { ...newItem, position } as T & { position: number },
  ];
}

export function reorderItemPositions<T extends { position?: number }>(
  current: T[],
  fromPosition: number,
  toPosition: number,
): T[] {
  return current.map((item) => {
    const pos = item.position;
    if (pos == null) return item;
    if (pos === fromPosition) return { ...item, position: toPosition };
    // 앞→뒤: 사이 아이템들을 한 칸 앞으로
    if (fromPosition < toPosition && pos > fromPosition && pos <= toPosition) {
      return { ...item, position: pos - 1 };
    }
    // 뒤→앞: 사이 아이템들을 한 칸 뒤로
    if (fromPosition > toPosition && pos >= toPosition && pos < fromPosition) {
      return { ...item, position: pos + 1 };
    }
    return item;
  });
}
