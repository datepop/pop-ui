import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  addItems,
  cropItem,
  deleteItem,
  getPlaceholderCount,
  replaceItem,
  reorderItems,
  revokeItemUrls,
} from './helpers';

import type { ImageInputItem } from './types';

const mockCreateObjectURL = vi.fn(
  (file: Blob | MediaSource) => `blob:mock/${file instanceof File ? file.name : 'blob'}`,
);
const mockRevokeObjectURL = vi.fn();

beforeEach(() => {
  vi.spyOn(URL, 'createObjectURL').mockImplementation(mockCreateObjectURL);
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(mockRevokeObjectURL);
  mockCreateObjectURL.mockClear();
  mockRevokeObjectURL.mockClear();
});

function makeFile(name: string): File {
  return new File(['data'], name, { type: 'image/jpeg' });
}

function makeItem(id: string, url = `blob:mock/${id}.jpg`): ImageInputItem {
  return { id, url, file: makeFile(`${id}.jpg`) };
}

// ─── addItems ────────────────────────────────────────────────────────────────

describe('addItems', () => {
  it('adds files to empty list, sorts by name, generates unique IDs', () => {
    const fileC = makeFile('c.jpg');
    const fileA = makeFile('a.jpg');
    const fileB = makeFile('b.jpg');
    const result = addItems([], [fileC, fileA, fileB]);

    expect(result).toHaveLength(3);
    expect(result[0].file!.name).toBe('a.jpg');
    expect(result[1].file!.name).toBe('b.jpg');
    expect(result[2].file!.name).toBe('c.jpg');
    const ids = result.map((i) => i.id);
    expect(new Set(ids).size).toBe(3);
  });

  it('clips to remaining slots when maxLength is set', () => {
    const current = [makeItem('x1'), makeItem('x2')];
    const files = [
      makeFile('a.jpg'),
      makeFile('b.jpg'),
      makeFile('c.jpg'),
      makeFile('d.jpg'),
      makeFile('e.jpg'),
    ];
    const result = addItems(current, files, 3);
    expect(result).toHaveLength(3);
    expect(result[2].file!.name).toBe('a.jpg');
  });

  it('is no-op when list is already at maxLength', () => {
    const current = [makeItem('x1'), makeItem('x2'), makeItem('x3')];
    const result = addItems(current, [makeFile('new.jpg')], 3);
    expect(result).toHaveLength(3);
    expect(result).toEqual(current);
  });

  it('accepts all files when no maxLength', () => {
    const files = Array.from({ length: 10 }, (_, i) => makeFile(`f${i}.jpg`));
    const result = addItems([], files);
    expect(result).toHaveLength(10);
  });

  it('calls URL.createObjectURL once per accepted file', () => {
    const files = [makeFile('a.jpg'), makeFile('b.jpg'), makeFile('c.jpg')];
    addItems([], files, 2);
    expect(mockCreateObjectURL).toHaveBeenCalledTimes(2);
  });
});

// ─── deleteItem ──────────────────────────────────────────────────────────────

describe('deleteItem', () => {
  it('removes item by id', () => {
    const items = [makeItem('a'), makeItem('b'), makeItem('c')];
    const result = deleteItem(items, 'b');
    expect(result).toHaveLength(2);
    expect(result.map((i) => i.id)).toEqual(['a', 'c']);
  });

  it('revokes blob URL when item.url starts with blob:', () => {
    const items = [makeItem('a', 'blob:mock/a.jpg')];
    deleteItem(items, 'a');
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock/a.jpg');
  });

  it('does NOT revoke if url is a non-blob URL', () => {
    const items = [{ id: 'a', url: 'https://example.com/a.jpg' }];
    deleteItem(items, 'a');
    expect(mockRevokeObjectURL).not.toHaveBeenCalled();
  });

  it('returns unchanged array when id not found', () => {
    const items = [makeItem('a'), makeItem('b')];
    const result = deleteItem(items, 'nonexistent');
    expect(result).toEqual(items);
  });
});

// ─── replaceItem ─────────────────────────────────────────────────────────────

describe('replaceItem', () => {
  it('replaces file and url for matching id', () => {
    const items = [makeItem('a'), makeItem('b')];
    const newFile = makeFile('new.jpg');
    mockCreateObjectURL.mockReturnValueOnce('blob:mock/new.jpg');
    const result = replaceItem(items, 'a', newFile);
    expect(result[0].file).toBe(newFile);
    expect(result[0].url).toBe('blob:mock/new.jpg');
  });

  it('preserves id and all other items', () => {
    const items = [makeItem('a'), makeItem('b'), makeItem('c')];
    const result = replaceItem(items, 'b', makeFile('new.jpg'));
    expect(result[0].id).toBe('a');
    expect(result[1].id).toBe('b');
    expect(result[2].id).toBe('c');
    expect(result).toHaveLength(3);
  });

  it('revokes old blob url', () => {
    const items = [makeItem('a', 'blob:mock/old.jpg')];
    replaceItem(items, 'a', makeFile('new.jpg'));
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock/old.jpg');
  });

  it('calls URL.createObjectURL for new file', () => {
    const items = [makeItem('a')];
    const newFile = makeFile('new.jpg');
    replaceItem(items, 'a', newFile);
    expect(mockCreateObjectURL).toHaveBeenCalledWith(newFile);
  });
});

// ─── cropItem ────────────────────────────────────────────────────────────────

describe('cropItem', () => {
  it('has same semantics as replaceItem', () => {
    const items = [makeItem('a'), makeItem('b')];
    const newFile = makeFile('cropped.jpg');
    mockCreateObjectURL.mockReturnValueOnce('blob:mock/cropped.jpg');
    const result = cropItem(items, 'a', newFile);
    expect(result[0].file).toBe(newFile);
    expect(result[0].url).toBe('blob:mock/cropped.jpg');
    expect(result[1].id).toBe('b');
  });

  it('preserves item id', () => {
    const items = [makeItem('target-id')];
    const result = cropItem(items, 'target-id', makeFile('cropped.jpg'));
    expect(result[0].id).toBe('target-id');
  });
});

// ─── reorderItems ────────────────────────────────────────────────────────────

describe('reorderItems', () => {
  it('moves item forward: all IDs present, order changed', () => {
    const items = [makeItem('a'), makeItem('b'), makeItem('c'), makeItem('d')];
    const result = reorderItems(items, 0, 2);
    expect(result.map((i) => i.id)).toEqual(['b', 'c', 'a', 'd']);
  });

  it('moves item backward: all IDs present, order changed', () => {
    const items = [makeItem('a'), makeItem('b'), makeItem('c'), makeItem('d')];
    const result = reorderItems(items, 3, 1);
    expect(result.map((i) => i.id)).toEqual(['a', 'd', 'b', 'c']);
  });

  it('IDs are stable after reorder', () => {
    const items = [makeItem('a'), makeItem('b'), makeItem('c')];
    const result = reorderItems(items, 1, 0);
    const originalIds = new Set(items.map((i) => i.id));
    const resultIds = new Set(result.map((i) => i.id));
    expect(resultIds).toEqual(originalIds);
  });
});

// ─── getPlaceholderCount ─────────────────────────────────────────────────────

describe('getPlaceholderCount', () => {
  it('no minLength, no maxLength, empty list → 1', () => {
    expect(getPlaceholderCount([])).toBe(1);
  });

  it('no minLength, no maxLength, 3 items → 1', () => {
    expect(getPlaceholderCount([makeItem('a'), makeItem('b'), makeItem('c')])).toBe(1);
  });

  it('minLength=3, 2 items, no maxLength → 1', () => {
    expect(getPlaceholderCount([makeItem('a'), makeItem('b')], 3)).toBe(1);
  });

  it('minLength=3, 2 items, maxLength=3 → 1', () => {
    expect(getPlaceholderCount([makeItem('a'), makeItem('b')], 3, 3)).toBe(1);
  });

  it('minLength=3, 3 items, no maxLength → 1 (always show 1 add slot when unbounded)', () => {
    expect(getPlaceholderCount([makeItem('a'), makeItem('b'), makeItem('c')], 3)).toBe(1);
  });

  it('minLength=3, 3 items, maxLength=3 → 0 (no room left)', () => {
    expect(getPlaceholderCount([makeItem('a'), makeItem('b'), makeItem('c')], 3, 3)).toBe(0);
  });

  it('no minLength, maxLength=3, 2 items → 1', () => {
    expect(getPlaceholderCount([makeItem('a'), makeItem('b')], undefined, 3)).toBe(1);
  });

  it('no minLength, maxLength=3, 3 items → 0', () => {
    expect(getPlaceholderCount([makeItem('a'), makeItem('b'), makeItem('c')], undefined, 3)).toBe(
      0,
    );
  });
});

// ─── revokeItemUrls ──────────────────────────────────────────────────────────

describe('revokeItemUrls', () => {
  it('calls revokeObjectURL for each blob URL in the list', () => {
    const items = [
      makeItem('a', 'blob:mock/a.jpg'),
      makeItem('b', 'blob:mock/b.jpg'),
      makeItem('c', 'blob:mock/c.jpg'),
    ];
    revokeItemUrls(items);
    expect(mockRevokeObjectURL).toHaveBeenCalledTimes(3);
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock/a.jpg');
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock/b.jpg');
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock/c.jpg');
  });

  it('skips non-blob URLs', () => {
    const items = [
      { id: 'a', url: 'https://example.com/a.jpg' },
      makeItem('b', 'blob:mock/b.jpg'),
      { id: 'c', url: '/local/c.jpg' },
    ];
    revokeItemUrls(items);
    expect(mockRevokeObjectURL).toHaveBeenCalledTimes(1);
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock/b.jpg');
  });
});
