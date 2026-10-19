import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconChevronRightDouble({
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
        d="M6 17L11 12L6 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 17L18 12L13 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
