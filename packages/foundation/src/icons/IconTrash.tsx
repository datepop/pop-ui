import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconTrash({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.70831 11.5334H32.1083V33.3001C32.1083 35.1334 30.6083 36.6334 28.775 36.6334H11.0416C9.20831 36.6334 7.70831 35.1334 7.70831 33.3001V11.5334Z"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
      />
      <path
        d="M15.9417 15.55V32.6167"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M23.875 15.55V32.6167"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M32.0584 7.15002H7.94168C6.72665 7.15002 5.74167 8.13127 5.74167 9.34169C5.74167 10.5521 6.72665 11.5334 7.94168 11.5334H32.0584C33.2734 11.5334 34.2583 10.5521 34.2583 9.34169C34.2583 8.13127 33.2734 7.15002 32.0584 7.15002Z"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
      />
      <path
        d="M14.7917 7.3667V5.3667C14.7917 4.2667 15.7083 3.3667 16.8416 3.3667H22.9917C24.125 3.3667 25.0416 4.2667 25.0416 5.3667V7.3667"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
