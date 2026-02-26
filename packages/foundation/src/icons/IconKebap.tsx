import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconKebap({
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
      <circle cx="12" cy="6" r="1.5" fill={color} strokeWidth={0}></circle>
      <circle cx="12" cy="12" r="1.5" fill={color} strokeWidth={0}></circle>
      <circle cx="12" cy="18" r="1.5" fill={color} strokeWidth={0}></circle>
    </svg>
  );
}
