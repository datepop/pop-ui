import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconChevronLeftDouble({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
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
        d="M12 6L6 12L12 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6L12 12L18 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
