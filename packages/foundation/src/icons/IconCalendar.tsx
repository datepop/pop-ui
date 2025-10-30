import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconCalendar({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 25) / 24}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="3"
        y="5.77771"
        width="18"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M7 3.77771V5.77771"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 3.77771V5.77771"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3.70044"
        y="6.26282"
        width="16.8291"
        height="4.51416"
        fill={color}
      />
    </svg>
  );
}
