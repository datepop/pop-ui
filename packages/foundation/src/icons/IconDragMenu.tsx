import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconDragMenu({
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
      <circle cx="9.5" cy="6" fill={color} r="1.5" />
      <circle cx="14.5" cy="6" fill={color} r="1.5" />
      <circle cx="9.5" cy="12" fill={color} r="1.5" />
      <circle cx="14.5" cy="12" fill={color} r="1.5" />
      <circle cx="9.5" cy="18" fill={color} r="1.5" />
      <circle cx="14.5" cy="18" fill={color} r="1.5" />
    </svg>
  );
}
