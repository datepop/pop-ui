import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconLocation({
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
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M12 7V3"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M12 21V17"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M17 12H21"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M3 12H7"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
}
