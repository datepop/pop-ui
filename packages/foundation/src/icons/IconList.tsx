import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconList({
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
        d="M7.84924 11.627H16.1508"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M7.84924 14.7368H16.1508"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M7.84924 17.8569H12.0949"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <rect
        x="3.96826"
        y="2.29883"
        width="16.0635"
        height="19.4025"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="6.58997"
        y="4.93408"
        width="10.8199"
        height="3.46565"
        rx="0.5"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
