import React, { useEffect, useRef } from 'react';

export interface IStyleDropdownOption {
  value: string;
  ariaLabel: string;
  label: React.ReactNode;
}

export interface IStyleDropdownProps {
  options: IStyleDropdownOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  tailPosition?: 'top' | 'bottom';
  onClose?: () => void;
}

export const StyleDropdown = ({
  options,
  selectedValue,
  onSelect,
  tailPosition = 'top',
  onClose,
}: IStyleDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const tailStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    width: '12px',
    height: '12px',
    borderRadius: '4px',
    zIndex: -1,
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    transform: 'translateX(-50%) rotate(45deg)',
    ...(tailPosition === 'top' ? { top: '-6px' } : { bottom: '-6px' }),
  };

  return (
    <div
      ref={dropdownRef}
      style={{ position: 'relative', width: 'max-content', minWidth: '100px' }}
    >
      {tailPosition === 'top' && <div style={tailStyle} />}
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => {
              onSelect(option.value);
              onClose?.();
            }}
            aria-label={option.ariaLabel}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              minHeight: '40px',
              padding: '12px',
              cursor: 'pointer',
              backgroundColor: selectedValue === option.value ? '#EFF6FF' : 'white',
              borderBottom: index < options.length - 1 ? '1px solid #E5E7EB' : 'none',
              border: 'none',
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      {tailPosition === 'bottom' && <div style={tailStyle} />}
    </div>
  );
};
