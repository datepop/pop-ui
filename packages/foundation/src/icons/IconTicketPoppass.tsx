import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconTicketPoppass({
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
        d="M20.1946 8.25122H3.80536C2.80829 8.25122 2 9.05951 2 10.0566V18.1525C2 19.1496 2.80829 19.9578 3.80536 19.9578H20.1946C21.1917 19.9578 22 19.1496 22 18.1525V10.0566C22 9.05951 21.1917 8.25122 20.1946 8.25122Z"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M6.20306 8.25132L14.8726 4.20807C15.7658 3.79434 16.8284 4.17986 17.2421 5.07313L18.7277 8.25132"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path d="M5 11H11" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path d="M5 14H7" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path d="M17 11.5V11" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path d="M17 14.5V14" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path d="M17 17.5V17" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}
