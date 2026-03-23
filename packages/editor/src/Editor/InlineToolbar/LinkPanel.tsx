import { ColorGray100, ColorGray900 } from '@pop-ui/foundation';
import React from 'react';

interface ILinkPanelProps {
  linkUrl: string;
  onLinkUrlChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const LinkPanel = ({
  linkUrl,
  onLinkUrlChange,
  onSubmit,
  onKeyDown,
  inputRef,
}: ILinkPanelProps) => (
  <form
    onSubmit={onSubmit}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '6px 8px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      border: `1px solid ${ColorGray100}`,
      width: '260px',
    }}
  >
    <input
      ref={inputRef}
      value={linkUrl}
      onChange={(e) => onLinkUrlChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="https://"
      style={{
        flex: 1,
        background: ColorGray100,
        border: `1px solid ${ColorGray100}`,
        borderRadius: '5px',
        color: ColorGray900,
        fontSize: '12px',
        padding: '4px 8px',
        outline: 'none',
      }}
    />
    <button
      type="submit"
      style={{
        background: '#3182CE',
        border: 'none',
        borderRadius: '5px',
        color: '#ffffff',
        fontSize: '12px',
        padding: '4px 10px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      확인
    </button>
  </form>
);
