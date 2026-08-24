import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconCreditCard({
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
      <rect
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        transform="rotate(90 22 5)"
        width="14"
        x="22"
        y="5"
      />
      <path d="M2 9H22" stroke={color} strokeWidth="1.5" />
      <path d="M5.5 12.5H9.5" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}
