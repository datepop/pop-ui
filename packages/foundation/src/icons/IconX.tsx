import { ColorGray900 } from '../tokens/colors';

import type { IIconLineWeightProps } from '../types/icon';

export default function IconX({
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
        d="M3.99951 3.99902L20.0011 20.0006"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M3.99951 20.001L20.0011 3.99936"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
