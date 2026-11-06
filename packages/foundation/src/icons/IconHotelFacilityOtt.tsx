import { useId } from 'react';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityOtt({
  size = 20,
  color = '#333333',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${id}-clip0_6528_54243)`}>
        <circle cx="10" cy="10" r="7.5" stroke={color} strokeWidth="1.25" strokeMiterlimit="10" />
        <path
          d="M8.44633 7.52779C8.41402 7.5099 8.37722 7.50031 8.33966 7.50001C8.3021 7.4997 8.26512 7.50869 8.23249 7.52605C8.19985 7.54341 8.17271 7.56853 8.15383 7.59886C8.13495 7.62919 8.12501 7.66364 8.125 7.69872V12.3013C8.12501 12.3364 8.13495 12.3708 8.15383 12.4011C8.17271 12.4315 8.19985 12.4566 8.23249 12.474C8.26512 12.4913 8.3021 12.5003 8.33966 12.5C8.37722 12.4997 8.41402 12.4901 8.44633 12.4722L12.6041 10.1709C12.6359 10.1533 12.6622 10.1283 12.6805 10.0984C12.6987 10.0684 12.7083 10.0345 12.7083 10C12.7083 9.96551 12.6987 9.93162 12.6805 9.90165C12.6622 9.87168 12.6359 9.84667 12.6041 9.82907L8.44633 7.52779Z"
          stroke={color}
          strokeWidth="1.25"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id={`${id}-clip0_6528_54243`}>
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
