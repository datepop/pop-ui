import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconChevronLeftDouble({
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
        d="M18 17L13 12L18 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 17L6 12L11 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
