import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconListBullet({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 5H21" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path d="M6 12H21" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path d="M6 19H21" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="3" cy="5" fill={color} r="1" />
      <circle cx="3" cy="12" fill={color} r="1" />
      <circle cx="3" cy="19" fill={color} r="1" />
    </svg>
  );
}
