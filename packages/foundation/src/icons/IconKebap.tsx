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
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20.8333" cy="9.16669" r="2.5" fill={color} strokeWidth={0} />
      <circle cx="20.8333" cy="19.1667" r="2.5" fill={color} strokeWidth={0} />
      <circle cx="20.8333" cy="29.1667" r="2.5" fill={color} strokeWidth={0} />
    </svg>
  );
}
