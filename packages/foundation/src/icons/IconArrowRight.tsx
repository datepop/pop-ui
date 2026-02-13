import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconArrowRight({
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
        d="M24.7222 10.8334L34.1667 20.8334L24.7222 30.8334"
        stroke={color}
        strokeWidth="3.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.1667 20.8342L5.83335 20.8342"
        stroke={color}
        strokeWidth="3.33333"
        strokeLinecap="round"
      />
    </svg>
  );
}
