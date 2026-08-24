import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconRoad({
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
      <g>
        <g>
          <path
            d="M15 3L20 8L15 13"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 8H8C6.34315 8 5 9.34315 5 11V21"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}
