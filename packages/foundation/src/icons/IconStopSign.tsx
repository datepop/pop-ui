import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconStopSign({
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
      <path d="M18 6L6 18" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="9" stroke={color} strokeMiterlimit="10" strokeWidth="1.5" />
    </svg>
  );
}
