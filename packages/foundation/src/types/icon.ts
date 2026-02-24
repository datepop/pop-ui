import type { SVGProps } from 'react';

interface IIconBaseProps extends SVGProps<SVGSVGElement> {
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
