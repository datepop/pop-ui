import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconCamera({
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
        d="M13.7637 4C14.5212 4 15.2139 4.42796 15.5527 5.10547L16.5 7H18C19.6569 7 21 8.34315 21 10V17C21 18.6569 19.6569 20 18 20H6C4.34315 20 3 18.6569 3 17V10C3 8.34315 4.34315 7 6 7H7.5L8.44727 5.10547C8.78607 4.42796 9.47882 4 10.2363 4H13.7637Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="12" cy="13" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="16.75" cy="9.75" fill={color} r="0.75" />
    </svg>
  );
}
