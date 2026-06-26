import { ColorGray900 } from '../tokens/colors';

import type { IIconLineWeightProps } from '../types/icon';

export default function IconArrowLeft({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  thick = false,
  ...props
}: IIconLineWeightProps) {
  const strokeWidth = thick ? 2.5 : 1.5;

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
        d="M21 11.9951L3 11.9951"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M10 5L3 12L10 19"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
