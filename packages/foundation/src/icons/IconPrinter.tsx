import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconPrinter({
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
        d="M19 20V8C19 7.44772 18.5523 7 18 7H6C5.44772 7 5 7.44772 5 8V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M19 9.5C20.1046 9.5 21 8.60457 21 7.5V4C21 2.89543 20.1046 2 19 2H5C3.89543 2 3 2.89543 3 4V7.5C3 8.60457 3.89543 9.5 5 9.5"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M8.5 11H15.5"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 14.5H15.5"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 18H12.875"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <circle cx="6.75" cy="4.75" fill={color} r="0.75" />
      <circle cx="9.75" cy="4.75" fill={color} r="0.75" />
    </svg>
  );
}
