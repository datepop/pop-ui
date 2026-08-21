import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconLogout({
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
        d="M9.5 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H9.5"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path d="M8 12L21 12" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path
        d="M17 8L21 12L17 16"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
