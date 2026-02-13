import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconFilter({
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
      <path
        d="M5 13.3333H21.7757M35 13.3333H31.6056"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M35 26.6667H18.2261M5 26.6667H8.39618"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="26.6667" cy="13.3333" r="4.58333" stroke={color} strokeWidth="2.5" />
      <circle cx="13.3333" cy="26.6667" r="4.58333" stroke={color} strokeWidth="2.5" />
    </svg>
  );
}
