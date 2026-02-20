import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconMenu({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
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
        d="M17.195 3.29498H18.235C19.385 3.29498 20.315 4.22498 20.315 5.37498V19.925C20.315 21.075 19.385 22.005 18.235 22.005H5.765C4.615 22.005 3.685 21.075 3.685 19.925V5.37498C3.685 4.22498 4.615 3.29498 5.765 3.29498H6.80499"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M16.195 1.995H7.80499C7.25271 1.995 6.80499 2.44271 6.80499 2.995V3.595C6.80499 4.14728 7.25271 4.595 7.80499 4.595H16.195C16.7473 4.595 17.195 4.14728 17.195 3.595V2.995C17.195 2.44271 16.7473 1.995 16.195 1.995Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M7.745 9.535H16.055"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M7.745 12.645H16.055"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M7.745 15.765H11.995"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
