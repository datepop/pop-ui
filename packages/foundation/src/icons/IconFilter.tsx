import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconFilter({
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
      <path d="M3 7H13.0654M21 7H18.9634" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="16" cy="7" r="2.5" stroke={color} strokeWidth="1.5" />
      <path
        d="M21 17H10.9356M3 17H5.03771"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="17" r="2.5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
