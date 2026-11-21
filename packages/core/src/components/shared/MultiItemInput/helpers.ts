export function generateItemId(): string {
  return crypto.randomUUID();
}

// Rotate only editable slots. An upload keeps its slot even when another file crosses it.
function movedPositions(from: number, to: number, locked: ReadonlySet<number>) {
  const moves = new Map<number, number>();
  if (
    !Number.isSafeInteger(from) ||
    !Number.isSafeInteger(to) ||
    from === to ||
    locked.has(from) ||
    locked.has(to)
  )
    return moves;
  const step = from < to ? 1 : -1;
  let previous = from;
  for (let position = from + step; position !== to + step; position += step) {
    if (!locked.has(position)) {
      moves.set(position, previous);
      previous = position;
    }
  }
  moves.set(from, to);
  return moves;
}

export function reorderItems<T>(
  current: T[],
  from: number,
  to: number,
  locked: ReadonlySet<number> = new Set(),
): T[] {
  const moves = movedPositions(from, to, locked);
  if (!moves.size) return current;
  const next = [...current];
  for (const [source, destination] of moves) next[destination] = current[source];
  return next;
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
  locked: ReadonlySet<number> = new Set(),
): T[] {
  const moves = movedPositions(fromPosition, toPosition, locked);
  if (!moves.size) return current;
  return current.map((item) => {
    const destination = item.position == null ? undefined : moves.get(item.position);
    return destination === undefined ? item : { ...item, position: destination };
  });
}
