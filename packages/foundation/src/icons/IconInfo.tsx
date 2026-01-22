import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconInfo({ size = 24, color = ColorGray900, ...props }: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="10"
        cy="10"
        r="7.5"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M10 5.75L10 7"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
      />
      <path
        d="M10 8L10 14"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
      />
    </svg>
  )
}

