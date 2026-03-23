import { ColorGray100, ColorGray900 } from '@pop-ui/foundation';
import React from 'react';

interface IMarkButtonProps {
  active: boolean;
  ariaLabel: string;
  onMouseDown: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

export const MarkButton = ({ active, ariaLabel, onMouseDown, children }: IMarkButtonProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    aria-pressed={active}
    onMouseDown={onMouseDown}
    style={{
      width: '28px',
      height: '28px',
      borderRadius: '5px',
      border: 'none',
      background: active ? ColorGray100 : 'none',
      color: ColorGray900,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '13px',
    }}
  >
    {children}
  </button>
);
