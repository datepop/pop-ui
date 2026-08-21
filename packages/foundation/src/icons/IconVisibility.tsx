import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconVisibility({
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
        d="M2.22925 10.3287C2.22925 10.3287 6.78911 6.52881 12.0004 6.52881C17.2117 6.52881 21.7715 10.3287 21.7715 10.3287"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M2.22925 14.6714C2.22925 14.6714 6.78911 18.4713 12.0004 18.4713C17.2117 18.4713 21.7715 14.6714 21.7715 14.6714"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <circle cx="12.0005" cy="12.5001" r="3.25705" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
