import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconLink({
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
        d="M14 8H18.1858C20.2941 8 22 9.78899 22 12C22 14.211 20.2941 16 18.1858 16H14"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M10 8H5.8142C3.70589 8 2 9.78899 2 12C2 14.211 3.70589 16 5.8142 16H10"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M7 12H17"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
}
