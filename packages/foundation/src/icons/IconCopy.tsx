import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconCopy({
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
      <path
        d="M16 6.9999V4.9999C16 3.8954 15.1046 2.9999 14 2.9999H6C4.8954 2.9999 4 3.8954 4 4.9999V15.9999C4 17.1045 4.8954 17.9999 6 17.9999H8"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="8"
        y="7"
        width="12"
        height="14"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
