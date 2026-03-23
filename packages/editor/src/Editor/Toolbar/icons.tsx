import { ColorGray300, ColorGray500 } from '@pop-ui/foundation';
import React from 'react';

import type { THeadingLevel } from '../../types';

// ─── Heading text icons ────────────────────────────────────────────────────────

export const H1_ICON = (
  <span
    style={{
      width: '20px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: ColorGray500,
      textAlign: 'center',
    }}
  >
    H1
  </span>
);

export const H2_ICON = (
  <span
    style={{
      width: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: ColorGray500,
      textAlign: 'center',
    }}
  >
    H2
  </span>
);

export const H3_ICON = (
  <span
    style={{
      width: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: ColorGray500,
      textAlign: 'center',
    }}
  >
    H3
  </span>
);

export const BODY_ICON = (
  <span style={{ width: '20px', fontSize: '13px', color: ColorGray500, textAlign: 'center' }}>
    T
  </span>
);

// ─── Block icons ───────────────────────────────────────────────────────────────

// Fixed 64px icon container ensures consistent dropdown alignment (no margin hacks)
export const HR_ICON_DEFAULT = (
  <div style={{ width: '64px', height: '1px', backgroundColor: ColorGray300 }} />
);

export const HR_ICON_SHORT = (
  <div style={{ width: '64px', display: 'flex', alignItems: 'center' }}>
    <div style={{ width: '34px', height: '1px', backgroundColor: ColorGray300 }} />
  </div>
);

export const BLOCKQUOTE_ICON_SOLID = (
  <div
    style={{ width: '3px', height: '20px', backgroundColor: ColorGray300, marginRight: '13px' }}
  />
);

// ─── Heading maps ──────────────────────────────────────────────────────────────

export const HEADING_ICON_MAP: Record<THeadingLevel, React.ReactNode> = {
  h1: H1_ICON,
  h2: H2_ICON,
  h3: H3_ICON,
};

export const HEADING_LABEL_MAP: Record<THeadingLevel, string> = {
  h1: '제목 1',
  h2: '제목 2',
  h3: '제목 3',
};
