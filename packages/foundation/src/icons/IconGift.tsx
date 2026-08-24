import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconGift({
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
        d="M14 12H20V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V12H10"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect height="14" stroke={color} strokeWidth="1.5" width="4" x="10" y="7" />
      <path
        d="M3 8L3 11C3 11.5523 3.44772 12 4 12L10 12L10 7L4 7C3.44772 7 3 7.44772 3 8Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M21 11L21 8C21 7.44772 20.5523 7 20 7L14 7L14 12L20 12C20.5523 12 21 11.5523 21 11Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12.4444 7C12.199 7 12 6.80102 12 6.55556L12 6.33333C12 4.49238 13.4924 3 15.3333 3L15.6667 3C16.403 3 17 3.59695 17 4.33333V4.33333C17 5.80609 15.8061 7 14.3333 7L12.4444 7Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M11.5556 7C11.801 7 12 6.80102 12 6.55556L12 6.33333C12 4.49238 10.5076 3 8.66667 3L8.33333 3C7.59695 3 7 3.59695 7 4.33333V4.33333C7 5.80609 8.19391 7 9.66667 7L11.5556 7Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
