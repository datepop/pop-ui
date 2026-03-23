import { ColorGray100, ColorGray50, ColorGray900 } from '@pop-ui/foundation';

// ─── CSS class name constants ──────────────────────────────────────────────────

export const CLS = {
  btn: 'pop-toolbar-btn',
  chevron: 'pop-toolbar-chevron',
  item: 'pop-toolbar-dropdown-item',
} as const;

// ─── Style injection ───────────────────────────────────────────────────────────

export const TOOLBAR_CSS = `
  .${CLS.btn}:hover { background-color: ${ColorGray50}; }
  .${CLS.btn}:active { background-color: ${ColorGray100}; }
  .${CLS.chevron}:hover { background-color: ${ColorGray50}; }
  .${CLS.chevron}:active { background-color: ${ColorGray100}; }
  .${CLS.item}:hover { background-color: ${ColorGray50}; }
  .${CLS.item}:active { background-color: ${ColorGray100}; }
`;

// ─── Inline style objects ──────────────────────────────────────────────────────

import type React from 'react';

export const BTN_STYLE: React.CSSProperties = {
  height: '40px',
  padding: '0 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  color: ColorGray900,
  whiteSpace: 'nowrap',
};

export const DROPDOWN_MAIN_BTN_STYLE: React.CSSProperties = { ...BTN_STYLE, paddingRight: '4px' };

export const CHEVRON_BTN_STYLE: React.CSSProperties = {
  padding: '0 12px 0 4px',
  height: '40px',
  minWidth: '16px',
  borderRadius: '6px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

export const DROPDOWN_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  zIndex: 20,
  backgroundColor: '#ffffff',
  border: `1px solid ${ColorGray100}`,
  borderRadius: '8px',
  padding: '4px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  width: 'max-content',
};

export const DROPDOWN_ITEM_STYLE: React.CSSProperties = {
  height: '36px',
  padding: '0 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '13px',
  color: ColorGray900,
  textAlign: 'left',
  width: '100%',
  whiteSpace: 'nowrap',
};

export const SEPARATOR_STYLE: React.CSSProperties = {
  width: '1px',
  height: '16px',
  margin: '0 2px',
  backgroundColor: ColorGray100,
  flexShrink: 0,
};
