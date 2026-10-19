import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconNote({
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
      <rect x="3.75" y="4.75" width="16.5" height="16.5" rx="3" stroke={color} strokeWidth="1.5" />
      <path d="M8 2.75V6.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 2.75V6.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 10H16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 13.5H16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 17H14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
