import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import IllustrationMegaphoneBlue from '../../illustrations/IllustrationMegaphoneBlue';
import IconArrowRight from '../IconArrowRight';
import IconCalendar from '../IconCalendar';
import IconCaretDown from '../IconCaretDown';
import IconCaretUp from '../IconCaretUp';
import IconGrid from '../IconGrid';
import IconNotification from '../IconNotification';
import IconQuote from '../IconQuote';
import IconQuoteSerif from '../IconQuoteSerif';
import IconRefresh from '../IconRefresh';
import IconRemove from '../IconRemove';
import IconReset from '../IconReset';
import IconShop from '../IconShop';
import IconSound from '../IconSound';
import IconSync from '../IconSync';
import IconTicket from '../IconTicket';
import IconTicketMovie from '../IconTicketMovie';
import IconTicketPoppass from '../IconTicketPoppass';
import IconTrashcan from '../IconTrashcan';
import * as Icons from '../index';

import type { IIconProps } from '../../types/icon';
import type { ComponentType } from 'react';

const figmaOnlyIcons = {
  IconImageAdd: ['line'],
  IconAlign: ['line'],
  IconChevronLeftCircle: ['line', 'filled'],
  IconControl: ['line'],
  IconDocumentCheck: ['line'],
  IconDownload: ['line'],
  IconDownloadCircle: ['line', 'filled'],
  IconKeyword: ['line'],
  IconMenuPlus: ['line'],
  IconOpenInFull: ['line'],
  IconParking: ['line'],
  IconPlayTicket2: ['line'],
  IconPurchase: ['line'],
  IconReport: ['line'],
  IconReport2: ['line'],
  IconRoad: ['line'],
  IconSyncAlt: ['line'],
  IconVisibilityOff: ['line'],
  IconWeb: ['line'],
} as const;

describe('normalized icons', () => {
  it.each([12, 16, 20, 24, 32, 40])('keeps a square 24px canvas at size %i', (size) => {
    for (const Icon of [IconShop, IconCalendar, IconArrowRight]) {
      const svg = renderToStaticMarkup(<Icon size={size} />);

      expect(svg).toContain(`width="${size}"`);
      expect(svg).toContain(`height="${size}"`);
      expect(svg).toContain('viewBox="0 0 24 24"');
    }
  });

  it('preserves line and filled color variants', () => {
    for (const variant of ['line', 'filled'] as const) {
      expect(renderToStaticMarkup(<IconShop color="#123456" variant={variant} />)).toContain(
        '#123456',
      );
      expect(renderToStaticMarkup(<IconCalendar color="#123456" variant={variant} />)).toContain(
        '#123456',
      );
    }
  });

  it('keeps legacy filled geometries inside the normalized canvas', () => {
    for (const Icon of [IconGrid, IconSound]) {
      const svg = renderToStaticMarkup(<Icon variant="filled" />);

      expect(svg).toContain('viewBox="0 0 24 24"');
      expect(svg).toContain('transform="scale(0.6)"');
    }
  });

  it('keeps notification line and filled outer geometries aligned', () => {
    const line = renderToStaticMarkup(<IconNotification />);
    const filled = renderToStaticMarkup(<IconNotification variant="filled" />);

    for (const path of ['M15 18.5C15 20.1542', 'M19.8477 18.2815H4.14175']) {
      expect(line).toContain(path);
      expect(filled).toContain(path);
    }
    expect(filled).toContain('M8.25 18.5H15.75');
    expect(filled).toContain('stroke-width="1.5"');
    expect(filled).not.toContain('transform=');
  });

  it('keeps caret up and down at the same visual size', () => {
    const down = renderToStaticMarkup(<IconCaretDown />);
    const path = down.match(/d="([^"]+)"/)?.[1];
    const up = renderToStaticMarkup(<IconCaretUp />);

    expect(path).toBeTruthy();
    expect(up).toContain(`d="${path}"`);
    expect(up).toContain('transform="rotate(180 12 12)"');
  });

  it('keeps refresh, sync, and reset directions distinct', () => {
    const refresh = renderToStaticMarkup(<IconRefresh />);
    const sync = renderToStaticMarkup(<IconSync />);
    const reset = renderToStaticMarkup(<IconReset />);

    expect(refresh.match(/<path/g)).toHaveLength(2);
    expect(sync.match(/<path/g)).toHaveLength(4);
    expect(reset).toContain('transform="translate(24 0) scale(-1 1)"');
  });

  it('keeps quote variants related and serif separate', () => {
    const line = renderToStaticMarkup(<IconQuote color="#123456" />);
    const filled = renderToStaticMarkup(<IconQuote color="#123456" variant="filled" />);
    const serif = renderToStaticMarkup(<IconQuoteSerif color="#123456" />);

    expect(line).toContain('fill="none"');
    expect(filled).toContain('fill="#123456"');
    expect(line.match(/<circle/g)).toHaveLength(2);
    expect(filled.match(/<circle/g)).toHaveLength(2);
    expect(serif.match(/<circle/g)).toBeNull();
    expect(serif.match(/<path/g)).toHaveLength(2);
  });

  it('keeps trashcan and remove as separate geometries', () => {
    expect(renderToStaticMarkup(<IconTrashcan />)).toContain('M5 5.5H19');
    expect(renderToStaticMarkup(<IconRemove />)).toContain('M11.9995 2.25049');
    expect(renderToStaticMarkup(<IconRemove variant="filled" />)).toContain('M11.9995 1.99951');
  });

  it('exports every Figma-only icon on a normalized canvas', () => {
    for (const [name, variants] of Object.entries(figmaOnlyIcons)) {
      const Icon = Icons[name as keyof typeof figmaOnlyIcons] as ComponentType<IIconProps>;

      for (const variant of variants) {
        const svg = renderToStaticMarkup(<Icon color="#123456" variant={variant} />);

        expect(svg).toContain('viewBox="0 0 24 24"');
        expect(svg).toContain('#123456');
      }
    }
  });

  it('exports align direction names without legacy swap aliases', () => {
    expect(Icons.IconAlignHorizontal).toBeTypeOf('function');
    expect(Icons.IconAlignVertical).toBeTypeOf('function');
    expect('IconSwapHorizontal' in Icons).toBe(false);
    expect('IconSwapVertical' in Icons).toBe(false);
  });

  it('exports image names without legacy photo aliases', () => {
    expect(Icons.IconImage).toBeTypeOf('function');
    expect(Icons.IconImageAdd).toBeTypeOf('function');
    expect('IconPhoto' in Icons).toBe(false);
    expect('IconAddImage' in Icons).toBe(false);
  });

  it('keeps ticket, movie ticket, and poppass ticket as separate public geometries', () => {
    expect(renderToStaticMarkup(<IconTicket />)).toContain('M12.0576 1.19434');
    expect(renderToStaticMarkup(<IconTicket variant="filled" />)).toContain('M11.5 0C11.7761');
    expect(renderToStaticMarkup(<IconTicketMovie />)).toContain('rotate(-30 12 12)');
    expect(renderToStaticMarkup(<IconTicketMovie variant="filled" />)).toContain('M16 0C17.1046');
    expect(renderToStaticMarkup(<IconTicketPoppass />)).toContain('M20.1946 8.25122');
  });

  it('uses the latest megaphone blue geometry', () => {
    const svg = renderToStaticMarkup(<IllustrationMegaphoneBlue />);

    expect(svg).toContain('cx="13.583"');
    expect(svg).toContain('M21.4181 7.44592');
  });
});
