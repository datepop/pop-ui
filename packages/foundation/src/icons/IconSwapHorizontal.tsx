import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconSwapHorizontal({
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
        d="M17.14 12.5146L18.42 13.8046L21 16.3746L18.42 18.9446L17.14 20.2346"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 16.3748L4.28 16.3748"
        stroke={color}
        strokeWidth="0.75"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M6.8501 11.4746L5.5701 10.1946L3.0001 7.62465L5.5701 5.05465L6.8501 3.76465"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.99996 7.62451L19.71 7.62451"
        stroke={color}
        strokeWidth="0.75"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}