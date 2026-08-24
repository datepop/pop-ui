import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHome({
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
        d="M20 9V19.0359C20 20.1208 19.1205 21 18.0351 21H5.96491C4.87953 21 4 20.1208 4 19.0359V9"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M9 21V16C9 14.8954 9.89543 14 11 14H13C14.1046 14 15 14.8954 15 16V21"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M2 10.5L10.7047 3.101C11.4516 2.46618 12.5484 2.46617 13.2953 3.101L22 10.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
