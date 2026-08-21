import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHelp({
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
      <path
        d="M4 10.4877C4 10.3169 4 10.1539 4 9.99809C4.00001 5.57989 7.58194 2 12.0001 2C16.4183 2 20 5.58166 20 9.99986V10.4877M14.2858 21C17.7483 20.2566 19.1687 17.9344 19.7055 16.2736"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M22 12C22 11.4477 21.5523 11 21 11H19V16H21C21.5523 16 22 15.5523 22 15V12Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M2 12C2 11.4477 2.44772 11 3 11H5V16H3C2.44772 16 2 15.5523 2 15V12Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <rect height="2" rx="1" stroke={color} strokeWidth="1.5" width="4" x="10" y="20" />
    </svg>
  );
}
