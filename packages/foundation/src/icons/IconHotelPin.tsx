import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelPin({
  size = 7.9979,
  color = '#9B9B9B',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size * 1.281586416434314}
      viewBox="0 0 7.9979 10.25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.60597 4.36146C7.37778 6.69436 5.70433 8.62941 4.72024 9.58337C4.32089 9.97219 3.66483 9.97219 3.26549 9.58337C2.20533 8.55707 0.375 6.37788 0.375 3.82796C0.375 1.87031 2.09123 0.292432 4.16877 0.378334C6.29385 0.468757 7.80089 2.34503 7.60597 4.35694V4.36146Z"
        fill="none"
        stroke={color}
        strokeWidth="0.75"
        strokeMiterlimit="10"
      />
      <path
        d="M3.99994 4.875C4.6903 4.875 5.24994 4.31536 5.24994 3.625C5.24994 2.93464 4.6903 2.375 3.99994 2.375C3.30958 2.375 2.74994 2.93464 2.74994 3.625C2.74994 4.31536 3.30958 4.875 3.99994 4.875Z"
        fill="none"
        stroke={color}
        strokeWidth="0.75"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
