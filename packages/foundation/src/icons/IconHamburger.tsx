import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconHamburger({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="18" height="1.5" x="3" y="4" fill={color} rx="0.75" strokeWidth={0}></rect>
      <rect width="18" height="1.5" x="3" y="11.5" fill={color} rx="0.75" strokeWidth={0}></rect>
      <rect width="18" height="1.5" x="3" y="19" fill={color} rx="0.75" strokeWidth={0}></rect>
    </svg>
  );
}
