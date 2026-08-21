import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconSyncAlt({
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
          <path d="M3 7.00488L21 7.00488" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g>
          <path
            d="M18 10L21 7L18 4"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <g>
        <g>
          <path d="M21 17.0049L3 17.0049" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g>
          <path
            d="M6 20L3 17L6 14"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
