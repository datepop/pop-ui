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
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="5" y="6.66663" width="30" height="2.5" rx="1.25" fill={color} strokeWidth={0} />
      <rect x="5" y="19.1666" width="30" height="2.5" rx="1.25" fill={color} strokeWidth={0} />
      <rect x="5" y="31.6666" width="30" height="2.5" rx="1.25" fill={color} strokeWidth={0} />
    </svg>
  );
}
