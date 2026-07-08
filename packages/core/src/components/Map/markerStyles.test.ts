import { describe, expect, it } from 'vitest';

import { getMarkerHTML } from './markerStyles';

import type { ICoord, TMarkerData } from './types';

const position: ICoord = { latitude: 37.5, longitude: 127.0 };
const base = { id: 'm1', position };

describe('getMarkerHTML', () => {
  describe('pin', () => {
    it('renders <img> when icon is present, always with the name', () => {
      const html = getMarkerHTML({ ...base, type: 'pin', name: '홍길동', icon: 'https://x/i.png' });

      expect(html).toContain('<img src="https://x/i.png"');
      expect(html).toContain('alt="홍길동"');
      expect(html).toContain('홍길동');
      expect(html).not.toContain('<svg');
    });

    it('renders inline <svg> when icon is absent, still with the name', () => {
      const html = getMarkerHTML({ ...base, type: 'pin', name: '홍길동' });

      expect(html).toContain('<svg');
      expect(html).toContain('홍길동');
      expect(html).not.toContain('<img');
    });
  });

  describe('popdeal', () => {
    it('renders all conditional fields and comma-formats prices', () => {
      const html = getMarkerHTML({
        ...base,
        type: 'popdeal',
        title: '치킨',
        price: 10000,
        originalPrice: 20000,
        discountRate: 50,
        category: '음식',
        active: true,
      });

      expect(html).toContain('active="true"');
      expect(html).toContain('음식');
      expect(html).toContain('20,000원');
      expect(html).toContain('50%');
      expect(html).toContain('10,000원');
    });

    it('omits conditional fields when falsy and marks active="false"', () => {
      const html = getMarkerHTML({ ...base, type: 'popdeal', title: '치킨', price: 5000 });

      expect(html).toContain('active="false"');
      expect(html).toContain('5,000원');
      expect(html).not.toContain('popdeal-marker-category');
      expect(html).not.toContain('popdeal-marker-original_price');
      expect(html).not.toContain('popdeal-marker-discount_rate');
    });
  });

  describe('pi', () => {
    it('renders the icon when present', () => {
      const html = getMarkerHTML({ ...base, type: 'pi', title: '카페', icon: 'https://x/c.png' });

      expect(html).toContain('pi-marker-icon');
      expect(html).toContain('https://x/c.png');
      expect(html).toContain('카페');
    });

    it('omits the icon when absent', () => {
      const html = getMarkerHTML({ ...base, type: 'pi', title: '카페' });

      expect(html).not.toContain('pi-marker-icon');
      expect(html).toContain('카페');
    });
  });

  describe('pi-expanded', () => {
    it('renders the address when present', () => {
      const html = getMarkerHTML({
        ...base,
        type: 'pi-expanded',
        title: '카페',
        address: '서울시 강남구',
      });

      expect(html).toContain('pi-expanded-marker-address');
      expect(html).toContain('서울시 강남구');
    });

    it('omits the address when absent', () => {
      const html = getMarkerHTML({ ...base, type: 'pi-expanded', title: '카페' });

      expect(html).not.toContain('pi-expanded-marker-address');
      expect(html).toContain('카페');
    });
  });

  describe('cluster', () => {
    it('renders the count', () => {
      const html = getMarkerHTML({ ...base, type: 'cluster', count: 42 });

      expect(html).toContain('42');
      expect(html).toContain('cluster-marker');
    });
  });

  describe('unknown type', () => {
    it('returns an empty string', () => {
      const html = getMarkerHTML({ ...base, type: 'nope' } as unknown as TMarkerData);

      expect(html).toBe('');
    });
  });
});
