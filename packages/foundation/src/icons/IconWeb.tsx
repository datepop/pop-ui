import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconWeb({
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
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <path d="M21 12H3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M12 21C10.6667 20 8 16.8 8 12C8 7.2 10.6667 4 12 3"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 21C13.3333 20 16 16.8 16 12C16 7.2 13.3333 4 12 3"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
