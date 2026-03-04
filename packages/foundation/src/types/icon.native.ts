import type { SvgProps } from 'react-native-svg';

interface IIconBaseProps extends SvgProps {
  size?: number;
  color?: string;
}

export interface IIconProps extends IIconBaseProps {
  variant?: 'line' | 'filled';
}

export interface IIconFilledOnlyProps extends IIconBaseProps {
  variant?: 'filled';
}

export interface IIconLineOnlyProps extends IIconBaseProps {
  variant?: 'line';
}
