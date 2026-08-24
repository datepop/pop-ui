import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconParking({
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
        <path
          d="M10 8H13C14.3807 8 15.5 9.11929 15.5 10.5V10.5C15.5 11.8807 14.3807 13 13 13H10V8Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M10 17V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
