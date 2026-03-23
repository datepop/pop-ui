import { ColorGray500, IconChevronDown } from '@pop-ui/foundation';
import React from 'react';

import {
  BTN_STYLE,
  CHEVRON_BTN_STYLE,
  CLS,
  DROPDOWN_CONTAINER_STYLE,
  DROPDOWN_ITEM_STYLE,
  DROPDOWN_MAIN_BTN_STYLE,
  SEPARATOR_STYLE,
} from './toolbarStyles';

// ─── Context ──────────────────────────────────────────────────────────────────

export const ToolbarContext = React.createContext(false);
export const useIconOnly = () => React.useContext(ToolbarContext);

// ─── Separator ────────────────────────────────────────────────────────────────

export const Separator = () => <div style={SEPARATOR_STYLE} />;

// ─── ToolbarButton ────────────────────────────────────────────────────────────

export interface IToolbarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  style?: React.CSSProperties;
}

export const ToolbarButton = ({ onClick, icon, label, style }: IToolbarButtonProps) => {
  const iconOnly = useIconOnly();
  const baseStyle: React.CSSProperties = iconOnly ? { ...BTN_STYLE, padding: '0 8px' } : BTN_STYLE;
  return (
    <button
      className={CLS.btn}
      style={style ? { ...baseStyle, ...style } : baseStyle}
      onClick={onClick}
      type="button"
      aria-label={iconOnly ? label : undefined}
    >
      {icon}
      {!iconOnly && label}
    </button>
  );
};

// ─── DropdownItem ─────────────────────────────────────────────────────────────

export interface IDropdownItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export const DropdownItem = ({ onClick, icon, label }: IDropdownItemProps) => (
  <button
    className={CLS.item}
    style={DROPDOWN_ITEM_STYLE}
    onClick={onClick}
    type="button"
    role="menuitem"
  >
    {icon}
    {label}
  </button>
);

// ─── ToolbarDropdownButton ────────────────────────────────────────────────────

export interface IToolbarDropdownButtonProps {
  icon: React.ReactNode;
  label: string;
  ariaLabel: string;
  isOpen: boolean;
  onMainClick: () => void;
  onChevronClick: () => void;
  children: React.ReactNode;
}

export const ToolbarDropdownButton = ({
  icon,
  label,
  ariaLabel,
  isOpen,
  onMainClick,
  onChevronClick,
  children,
}: IToolbarDropdownButtonProps) => {
  const iconOnly = useIconOnly();
  const mainBtnStyle: React.CSSProperties = iconOnly
    ? { ...BTN_STYLE, padding: '0 4px 0 8px' }
    : DROPDOWN_MAIN_BTN_STYLE;
  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <button
        className={CLS.btn}
        style={mainBtnStyle}
        onClick={onMainClick}
        type="button"
        aria-label={iconOnly ? label : undefined}
      >
        {icon}
        {!iconOnly && label}
      </button>
      <button
        className={CLS.chevron}
        style={CHEVRON_BTN_STYLE}
        onClick={onChevronClick}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
      >
        <IconChevronDown size={10} color={ColorGray500} />
      </button>
      {isOpen && (
        <div style={DROPDOWN_CONTAINER_STYLE} role="menu">
          {children}
        </div>
      )}
    </div>
  );
};
