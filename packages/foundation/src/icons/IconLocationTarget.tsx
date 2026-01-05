import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconLocationTarget({
  size = 24,
  color = ColorGray900,
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M16.5001 9H12.4751"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M5.525 9H1.5"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M9 16.5V12.475"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M9 5.525V1.5"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
