import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconMenu({
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
        d="M8 9H16"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M8 12.5H16"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M8 16H13"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M7 3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V4C17 4.55228 16.5523 5 16 5H8C7.44772 5 7 4.55228 7 4V3Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17.5 3.5H18C19.1046 3.5 20 4.39543 20 5.5V19.5C20 20.6046 19.1046 21.5 18 21.5H6C4.89543 21.5 4 20.6046 4 19.5V5.5C4 4.39543 4.89543 3.5 6 3.5H6.5"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
