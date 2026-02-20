import type { SVGProps } from "react";

export interface IIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  variant?: 'line' | 'filled';
}
