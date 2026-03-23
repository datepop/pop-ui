import { IconX, ColorGray600 } from '@pop-ui/foundation';
import React from 'react';

interface IDeleteButtonProps {
  onClick: () => void;
  'aria-label'?: string;
  variant?: 'overlay' | 'inline' | 'absolute';
}

const buttonBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  background: 'white',
  color: '#4B5563',
  borderRadius: '50%',
};

export const DeleteButton = ({
  onClick,
  'aria-label': ariaLabel = '삭제',
  variant = 'inline',
}: IDeleteButtonProps) => {
  if (variant === 'overlay') {
    return (
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        contentEditable={false}
        style={{
          ...buttonBase,
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '28px',
          height: '28px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 5px rgba(0,0,0,0.16)',
          backdropFilter: 'blur(3px)',
        }}
      >
        <IconX size={16} color={ColorGray600} />
      </button>
    );
  }

  if (variant === 'absolute') {
    return (
      <span
        contentEditable={false}
        style={{ position: 'absolute', top: '50%', right: '8px', transform: 'translateY(-50%)' }}
      >
        <button
          onClick={onClick}
          aria-label={ariaLabel}
          style={{ ...buttonBase, width: '28px', height: '28px' }}
        >
          <IconX size={16} color={ColorGray600} />
        </button>
      </span>
    );
  }

  return (
    <span style={{ flexShrink: 0 }}>
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        style={{ ...buttonBase, width: '40px', height: '40px' }}
      >
        <IconX size={20} color={ColorGray600} />
      </button>
    </span>
  );
};
