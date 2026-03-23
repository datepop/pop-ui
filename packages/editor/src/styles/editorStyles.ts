import type React from 'react';

export interface IBlockStyleOptions {
  /** 블록 간 간격 (px, 기본 16) */
  blockSpacing?: number;
  /** 줄간격 (기본 '175%') */
  lineHeight?: number | string;
}

export interface IBlockStyles {
  paragraph: React.CSSProperties;
  heading1: React.CSSProperties;
  heading2: React.CSSProperties;
  heading3: React.CSSProperties;
  ulList: React.CSSProperties;
  olList: React.CSSProperties;
  listItem: React.CSSProperties;
  image: React.CSSProperties;
  imageWrapper: React.CSSProperties;
  imageCaption: React.CSSProperties;
  hrWrapper: React.CSSProperties;
  hrDefault: React.CSSProperties;
  hrShort: React.CSSProperties;
  blockquoteText: React.CSSProperties;
  blockquoteDefaultContainer: React.CSSProperties;
  blockquoteDefaultText: React.CSSProperties;
  blockquoteSolidContainer: React.CSSProperties;
  card: React.CSSProperties;
  cardIconContainer: React.CSSProperties;
  cardInfo: React.CSSProperties;
  cardName: React.CSSProperties;
  cardAddress: React.CSSProperties;
  cardLinkText: React.CSSProperties;
  inlineLink: React.CSSProperties;
}

export const DEFAULT_BLOCK_SPACING = 16;
export const DEFAULT_LINE_HEIGHT = '175%';

export function createBlockStyles(options?: IBlockStyleOptions): IBlockStyles {
  const bs = `${options?.blockSpacing ?? DEFAULT_BLOCK_SPACING}px`;
  const lh = `${options?.lineHeight ?? DEFAULT_LINE_HEIGHT}`;
  const listGap = `${Math.round((options?.blockSpacing ?? DEFAULT_BLOCK_SPACING) * 0.625 * 2) / 2}px`;
  const hrPad = `${Math.round((options?.blockSpacing ?? DEFAULT_BLOCK_SPACING) * 1.875 * 2) / 2}px`;

  const headingBase: React.CSSProperties = {
    fontWeight: 'bold',
    lineHeight: lh,
    marginTop: 0,
    marginBottom: bs,
    paddingTop: '8px',
    margin: 0,
  };

  const listBase: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: listGap,
    paddingLeft: '24px',
    margin: 0,
    marginBottom: bs,
  };

  const blockquoteTextBase: React.CSSProperties = {
    margin: 0,
    fontStyle: 'italic',
    color: '#374151',
    lineHeight: lh,
  };

  return {
    paragraph: { lineHeight: lh, marginTop: 0, marginBottom: bs },
    heading1: { ...headingBase, fontSize: '20px' },
    heading2: { ...headingBase, fontSize: '18px' },
    heading3: { ...headingBase, fontSize: '16px' },
    ulList: { ...listBase, listStyleType: 'disc' },
    olList: { ...listBase, listStyleType: 'decimal' },
    listItem: { lineHeight: lh },
    image: { width: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block' },
    imageWrapper: { margin: 0, marginBottom: bs },
    imageCaption: { fontSize: '13px', color: '#6B7280', textAlign: 'center', marginTop: '6px' },
    hrWrapper: { padding: `${hrPad} 0`, marginBottom: bs },
    hrDefault: { border: 'none', borderTop: '1px solid #F3F4F6', width: '100%', margin: '0 auto' },
    hrShort: {
      border: 'none',
      borderTop: '1px solid #F3F4F6',
      width: '25%',
      minWidth: '100px',
      margin: '0 auto',
    },
    blockquoteText: blockquoteTextBase,
    blockquoteDefaultContainer: {
      marginBottom: bs,
      padding: '10px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    blockquoteDefaultText: { ...blockquoteTextBase, textAlign: 'center', padding: '24px 20px' },
    blockquoteSolidContainer: {
      marginBottom: bs,
      padding: '10px 0',
      paddingLeft: '16px',
      borderLeft: '3px solid #D1D5DB',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    card: {
      display: 'flex',
      border: '1px solid #F3F4F6',
      borderRadius: '8px',
      padding: '8px 16px',
      alignItems: 'center',
      gap: '8px',
      marginBottom: bs,
    },
    cardIconContainer: {
      width: '40px',
      height: '40px',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    cardInfo: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' },
    cardName: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#1F2937',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
    },
    cardAddress: {
      fontSize: '12px',
      color: '#9CA3AF',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
    },
    cardLinkText: {
      fontSize: '14px',
      color: '#1F2937',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
    },
    inlineLink: { textDecoration: 'underline', opacity: 0.6 },
  };
}
