import {
  ColorGray100,
  ColorGray400,
  ColorGray900,
  ColorAqua500,
  ColorBlue500,
  ColorRed500,
} from '@pop-ui/foundation';
import React from 'react';

const DEFAULT_PALETTE = [
  { label: '회색', value: ColorGray400 },
  { label: '민트', value: ColorAqua500 },
  { label: '파랑', value: ColorBlue500 },
  { label: '빨강', value: ColorRed500 },
];

interface IColorPanelProps {
  currentColor: string | undefined;
  onColorSelect: (e: React.MouseEvent, color: string | null) => void;
  palette?: string[];
}

export const ColorPanel = ({ currentColor, onColorSelect, palette }: IColorPanelProps) => {
  const colors = palette ? palette.map((value) => ({ label: value, value })) : DEFAULT_PALETTE;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '6px 10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        border: `1px solid ${ColorGray100}`,
      }}
    >
      {/* 색상 제거 */}
      <button
        type="button"
        onMouseDown={(e) => onColorSelect(e, null)}
        aria-label="색상 제거"
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          border: `1.5px solid ${ColorGray100}`,
          background: 'none',
          color: ColorGray900,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
        }}
      >
        ✕
      </button>

      {colors.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          onMouseDown={(e) => onColorSelect(e, value)}
          aria-label={label}
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            border:
              currentColor === value ? `2px solid ${ColorGray900}` : `1.5px solid ${ColorGray100}`,
            backgroundColor: value,
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
};
