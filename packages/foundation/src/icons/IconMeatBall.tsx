import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconMeatBall({
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
      <circle cx="18" cy="12" fill={color} r="1.5" transform="rotate(90 18 12)" />
      <circle cx="12" cy="12" fill={color} r="1.5" transform="rotate(90 12 12)" />
      <circle cx="6" cy="12" fill={color} r="1.5" transform="rotate(90 6 12)" />
    </svg>
  );
}
