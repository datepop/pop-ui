import { describe, expect, it, vi, beforeEach } from 'vitest';

import {
  isValidLottieJSON,
  parseLottieFile,
  addItems,
  deleteItem,
  reorderItems,
  getPlaceholderCount,
} from './helpers';

// ─── isValidLottieJSON ────────────────────────────────────────────────────────

describe('isValidLottieJSON', () => {
  const validLottie = {
    v: '5.9.0',
    fr: 30,
    ip: 0,
    op: 60,
    w: 400,
    h: 400,
    layers: [],
  };

  it('returns true for a valid lottie JSON object', () => {
    expect(isValidLottieJSON(validLottie)).toBe(true);
  });

  it('returns true when layers has items', () => {
    expect(isValidLottieJSON({ ...validLottie, layers: [{ ty: 0 }] })).toBe(true);
  });

  it('returns false for null', () => {
    expect(isValidLottieJSON(null)).toBe(false);
  });

  it('returns false for a plain string', () => {
    expect(isValidLottieJSON('lottie')).toBe(false);
  });

  it('returns false for an array', () => {
    expect(isValidLottieJSON([])).toBe(false);
  });

  it('returns false when missing v field', () => {
    const { v: _v, ...rest } = validLottie;
    expect(isValidLottieJSON(rest)).toBe(false);
  });

  it('returns false when layers is not an array', () => {
    expect(isValidLottieJSON({ ...validLottie, layers: {} })).toBe(false);
  });

  it('returns false when missing multiple fields', () => {
    expect(isValidLottieJSON({ v: '5', layers: [] })).toBe(false);
  });
});

// ─── parseLottieFile ──────────────────────────────────────────────────────────

describe('parseLottieFile', () => {
  const validLottie = { v: '5', fr: 30, ip: 0, op: 60, w: 400, h: 400, layers: [] };

  const makeFile = (content: string, name = 'anim.json') =>
    new File([content], name, { type: 'application/json' });

  beforeEach(() => {
    // jsdom's FileReader is available in vitest
  });

  it('resolves with parsed JSON for a valid lottie file', async () => {
    const file = makeFile(JSON.stringify(validLottie));
    const result = await parseLottieFile(file);
    expect(result).toEqual(validLottie);
  });

  it('resolves null for invalid lottie JSON (missing fields)', async () => {
    const file = makeFile(JSON.stringify({ v: '5' }));
    const result = await parseLottieFile(file);
    expect(result).toBeNull();
  });

  it('resolves null for non-JSON content', async () => {
    const file = makeFile('not json at all }{');
    const result = await parseLottieFile(file);
    expect(result).toBeNull();
  });
});

// ─── addItems ─────────────────────────────────────────────────────────────────

describe('addItems', () => {
  const makeFile = (name: string) => new File(['data'], name, { type: 'application/json' });

  it('adds files sorted by name', () => {
    const files = [makeFile('c.json'), makeFile('a.json'), makeFile('b.json')];
    const result = addItems([], files);
    expect(result.map((i) => i.file?.name)).toEqual(['a.json', 'b.json', 'c.json']);
  });

  it('does not create blob URLs (no URL.createObjectURL call)', () => {
    const spy = vi.spyOn(URL, 'createObjectURL');
    addItems([], [makeFile('a.json')]);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('respects maxLength', () => {
    const files = [makeFile('a.json'), makeFile('b.json'), makeFile('c.json')];
    const result = addItems([], files, 2);
    expect(result).toHaveLength(2);
  });

  it('appends to existing items', () => {
    const existing = [{ id: 'x', file: makeFile('x.json') }];
    const result = addItems(existing, [makeFile('a.json')]);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('x');
  });

  it('maxLength considers existing items', () => {
    const existing = [{ id: 'x' }];
    const files = [makeFile('a.json'), makeFile('b.json')];
    const result = addItems(existing, files, 2);
    expect(result).toHaveLength(2);
  });
});

// ─── deleteItem ───────────────────────────────────────────────────────────────

describe('deleteItem', () => {
  it('removes the item with the given id', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    expect(deleteItem(items, 'b').map((i) => i.id)).toEqual(['a', 'c']);
  });

  it('does not call revokeObjectURL (no blob URLs in LottieInput)', () => {
    const spy = vi.spyOn(URL, 'revokeObjectURL');
    deleteItem([{ id: 'a', url: 'https://example.com/a.json' }], 'a');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

// ─── reorderItems ─────────────────────────────────────────────────────────────

describe('reorderItems', () => {
  const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

  it('moves item forward', () => {
    expect(reorderItems(items, 0, 2).map((i) => i.id)).toEqual(['b', 'c', 'a']);
  });

  it('moves item backward', () => {
    expect(reorderItems(items, 2, 0).map((i) => i.id)).toEqual(['c', 'a', 'b']);
  });

  it('does not mutate the original array', () => {
    reorderItems(items, 0, 1);
    expect(items.map((i) => i.id)).toEqual(['a', 'b', 'c']);
  });
});

// ─── getPlaceholderCount ──────────────────────────────────────────────────────

describe('getPlaceholderCount', () => {
  it('no constraints, 0 items → 1 placeholder', () => {
    expect(getPlaceholderCount([])).toBe(1);
  });

  it('no constraints, 2 items → 1 placeholder', () => {
    expect(getPlaceholderCount([{ id: 'a' }, { id: 'b' }])).toBe(1);
  });

  it('maxLength=2, 2 items → 0 placeholders', () => {
    expect(getPlaceholderCount([{ id: 'a' }, { id: 'b' }], undefined, 2)).toBe(0);
  });

  it('maxLength=3, 1 item → 1 placeholder', () => {
    expect(getPlaceholderCount([{ id: 'a' }], undefined, 3)).toBe(1);
  });

  it('minLength=3, 1 item → 2 placeholders', () => {
    expect(getPlaceholderCount([{ id: 'a' }], 3)).toBe(2);
  });

  it('minLength=3, 3 items, maxLength=5 → 0 placeholders', () => {
    expect(getPlaceholderCount([{ id: 'a' }, { id: 'b' }, { id: 'c' }], 3, 5)).toBe(0);
  });

  it('minLength=2, 0 items, no maxLength → at least 1 placeholder', () => {
    expect(getPlaceholderCount([], 2)).toBe(2);
  });
});
