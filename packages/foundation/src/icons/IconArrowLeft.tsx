import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconArrowLeft({
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
        d="M15.2778 10.8334L5.83331 20.8334L15.2778 30.8334"
        stroke={color}
        strokeWidth="3.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83331 20.8342L34.1666 20.8342"
        stroke={color}
        strokeWidth="3.33333"
        strokeLinecap="round"
      />
    </svg>
  );
}
