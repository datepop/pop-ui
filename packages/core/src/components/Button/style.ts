import {
  BgColorButtonBgPrimaryDefault,
  BgColorButtonBgPrimaryHover,
  BgColorButtonBgPrimaryPressed,
  BgColorButtonBgPrimaryFocused,
  BgColorButtonBgPrimaryDisabled,
  BgColorButtonBgPrimarylineDefault,
  BgColorButtonBgPrimarylineHover,
  BgColorButtonBgPrimarylinePressed,
  BgColorButtonBgPrimarylineFocused,
  BgColorButtonBgPrimarylineDisabled,
  BgColorButtonBgBasicDefault,
  BgColorButtonBgBasicHover,
  BgColorButtonBgBasicPreseed,
  BgColorButtonBgBasicFocused,
  BgColorButtonBgBasicDisabled,
  BgColorButtonBgWarningDefault,
  BgColorButtonBgWarningHover,
  BgColorButtonBgWarningPressed,
  BgColorButtonBgWarningFocused,
  BgColorButtonBgWarningDisabled,
  BgColorButtonBgSettingDefault,
  BgColorButtonBgSettingHover,
  BgColorButtonBgSettingPressed,
  BgColorButtonBgSettingFocused,
  BgColorButtonBgSettingDisabled,
  TextColorButtonTextPrimaryDefault,
  TextColorButtonTextPrimaryHover,
  TextColorButtonTextPrimaryPressed,
  TextColorButtonTextPrimaryFocused,
  TextColorButtonTextPrimaryDisabled,
  TextColorButtonTextPrimarylineDefault,
  TextColorButtonTextPrimarylineHover,
  TextColorButtonTextPrimarylinePressed,
  TextColorButtonTextPrimarylineFocused,
  TextColorButtonTextPrimarylineDisabled,
  TextColorButtonTextBasicDefault,
  TextColorButtonTextBasicHover,
  TextColorButtonTextBasicPressed,
  TextColorButtonTextBasicFocused,
  TextColorButtonTextBasicDisabled,
  TextColorButtonTextWarningDefault,
  TextColorButtonTextWarningHover,
  TextColorButtonTextWarningPressed,
  TextColorButtonTextWarningFocused,
  TextColorButtonTextWarningDisabled,
  TextColorButtonTextSettingDefault,
  TextColorButtonTextSettingHover,
  TextColorButtonTextSettingPressed,
  TextColorButtonTextSettingFocused,
  TextColorButtonTextSettingDisabled,
  BorderColorButtonBorderPrimarylineDefault,
  BorderColorButtonBorderPrimarylineHover,
  BorderColorButtonBorderPrimarylinePressed,
  BorderColorButtonBorderPrimarylineFocused,
  BorderColorButtonBorderBasicDefault,
  BorderColorButtonBorderBasicHover,
  BorderColorButtonBorderBasicPressed,
  BorderColorButtonBorderBasicFocused,
} from '../../tokens/colors';

import type { CSSProperties } from 'react';
import type { TButtonSize, TButtonVariant } from './type';

interface VariantStyleStates {
  default: CSSProperties;
  hover: CSSProperties;
  active: CSSProperties;
  focus: CSSProperties;
  disabled: CSSProperties;
}

interface SizeStyle extends CSSProperties {
  height: string;
  padding: string;
  fontSize: string;
  fontWeight: number;
  borderRadius: string;
  lineHeight: string;
}

export const LOADER_COLOR_MAP = {
  primary: TextColorButtonTextPrimaryDefault,
  primaryLine: TextColorButtonTextPrimarylineDefault,
  basic: TextColorButtonTextBasicDefault,
  danger: TextColorButtonTextPrimaryDefault,
  setting: TextColorButtonTextPrimaryDefault,
  warning: TextColorButtonTextPrimaryDefault,
} as const;

export const BUTTON_VARIANT_STYLES: Record<TButtonVariant, VariantStyleStates> = {
  primary: {
    default: {
      backgroundColor: BgColorButtonBgPrimaryDefault,
      color: TextColorButtonTextPrimaryDefault,
      border: 'none',
    },
    hover: {
      backgroundColor: BgColorButtonBgPrimaryHover,
      color: TextColorButtonTextPrimaryHover,
    },
    active: {
      backgroundColor: BgColorButtonBgPrimaryPressed,
      color: TextColorButtonTextPrimaryPressed,
    },
    focus: {
      backgroundColor: BgColorButtonBgPrimaryFocused,
      color: TextColorButtonTextPrimaryFocused,
    },
    disabled: {
      backgroundColor: BgColorButtonBgPrimaryDisabled,
      color: TextColorButtonTextPrimaryDisabled,
      cursor: 'not-allowed',
    },
  },
  primaryLine: {
    default: {
      backgroundColor: BgColorButtonBgPrimarylineDefault,
      color: TextColorButtonTextPrimarylineDefault,
      border: `1px solid ${BorderColorButtonBorderPrimarylineDefault}`,
    },
    hover: {
      backgroundColor: BgColorButtonBgPrimarylineHover,
      color: TextColorButtonTextPrimarylineHover,
      borderColor: BorderColorButtonBorderPrimarylineHover,
    },
    active: {
      backgroundColor: BgColorButtonBgPrimarylinePressed,
      color: TextColorButtonTextPrimarylinePressed,
      borderColor: BorderColorButtonBorderPrimarylinePressed,
    },
    focus: {
      backgroundColor: BgColorButtonBgPrimarylineFocused,
      color: TextColorButtonTextPrimarylineFocused,
      borderColor: BorderColorButtonBorderPrimarylineFocused,
    },
    disabled: {
      backgroundColor: BgColorButtonBgPrimarylineDisabled,
      color: TextColorButtonTextPrimarylineDisabled,
      cursor: 'not-allowed',
    },
  },
  basic: {
    default: {
      backgroundColor: BgColorButtonBgBasicDefault,
      color: TextColorButtonTextBasicDefault,
      border: `1px solid ${BorderColorButtonBorderBasicDefault}`,
    },
    hover: {
      backgroundColor: BgColorButtonBgBasicHover,
      color: TextColorButtonTextBasicHover,
      borderColor: BorderColorButtonBorderBasicHover,
    },
    active: {
      backgroundColor: BgColorButtonBgBasicPreseed,
      color: TextColorButtonTextBasicPressed,
      borderColor: BorderColorButtonBorderBasicPressed,
    },
    focus: {
      backgroundColor: BgColorButtonBgBasicFocused,
      color: TextColorButtonTextBasicFocused,
      borderColor: BorderColorButtonBorderBasicFocused,
    },
    disabled: {
      backgroundColor: BgColorButtonBgBasicDisabled,
      color: TextColorButtonTextBasicDisabled,
      cursor: 'not-allowed',
    },
  },
  danger: {
    default: {
      backgroundColor: BgColorButtonBgWarningDefault,
      color: TextColorButtonTextWarningDefault,
      border: 'none',
    },
    hover: {
      backgroundColor: BgColorButtonBgWarningHover,
      color: TextColorButtonTextWarningHover,
    },
    active: {
      backgroundColor: BgColorButtonBgWarningPressed,
      color: TextColorButtonTextWarningPressed,
    },
    focus: {
      backgroundColor: BgColorButtonBgWarningFocused,
      color: TextColorButtonTextWarningFocused,
    },
    disabled: {
      backgroundColor: BgColorButtonBgWarningDisabled,
      color: TextColorButtonTextWarningDisabled,
      cursor: 'not-allowed',
    },
  },
  setting: {
    default: {
      backgroundColor: BgColorButtonBgSettingDefault,
      color: TextColorButtonTextSettingDefault,
      border: 'none',
    },
    hover: {
      backgroundColor: BgColorButtonBgSettingHover,
      color: TextColorButtonTextSettingHover,
    },
    active: {
      backgroundColor: BgColorButtonBgSettingPressed,
      color: TextColorButtonTextSettingPressed,
    },
    focus: {
      backgroundColor: BgColorButtonBgSettingFocused,
      color: TextColorButtonTextSettingFocused,
    },
    disabled: {
      backgroundColor: BgColorButtonBgSettingDisabled,
      color: TextColorButtonTextSettingDisabled,
      cursor: 'not-allowed',
    },
  },
  warning: {
    default: {
      backgroundColor: BgColorButtonBgWarningDefault,
      color: TextColorButtonTextWarningDefault,
      border: 'none',
    },
    hover: {
      backgroundColor: BgColorButtonBgWarningHover,
      color: TextColorButtonTextWarningHover,
    },
    active: {
      backgroundColor: BgColorButtonBgWarningPressed,
      color: TextColorButtonTextWarningPressed,
    },
    focus: {
      backgroundColor: BgColorButtonBgWarningFocused,
      color: TextColorButtonTextWarningFocused,
    },
    disabled: {
      backgroundColor: BgColorButtonBgWarningDisabled,
      color: TextColorButtonTextWarningDisabled,
      cursor: 'not-allowed',
    },
  },
};

export const BUTTON_SIZE_STYLES: Record<TButtonSize, SizeStyle> = {
  lg: {
    height: '50px',
    padding: '0 20px',
    fontSize: '18px',
    fontWeight: 700,
    borderRadius: '6px',
    lineHeight: '130%',
    fontFamily: 'Pretendard',
  },
  md: {
    height: '40px',
    padding: '0 16px',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '6px',
    lineHeight: '130%',
    fontFamily: 'Pretendard',
  },
  sm: {
    height: '30px',
    padding: '0 12px',
    fontSize: '14px',
    fontWeight: 600,
    borderRadius: '4px',
    lineHeight: '130%',
    fontFamily: 'Pretendard',
  },
};

export function getButtonStyles(variant: TButtonVariant, size: TButtonSize) {
  const variantStyles = BUTTON_VARIANT_STYLES[variant];
  const sizeStyles = BUTTON_SIZE_STYLES[size];

  return {
    root: {
      ...sizeStyles,
      ...variantStyles.default,

      '&:hover:not(:disabled)': variantStyles.hover,
      '&:active:not(:disabled)': variantStyles.active,
      '&:focus:not(:disabled)': variantStyles.focus,
      '&:disabled': variantStyles.disabled,
    },
  };
}
