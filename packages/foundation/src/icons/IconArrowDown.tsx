import { ColorGray900 } from '../tokens/colors';

import type { IIconLineWeightProps } from '../types/icon';

export default function IconArrowDown({
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
        d="M12.0049 3L12.0049 21"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M19 14L12 21L5 14"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
