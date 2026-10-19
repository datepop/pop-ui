import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconSmartphone({
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
      <rect x="6.5" y="2.75" width="11" height="18.5" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M10.25 5.25H13.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
