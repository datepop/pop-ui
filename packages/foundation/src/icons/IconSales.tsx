import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconSales({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="3"
        y="6.77783"
        width="18"
        height="13.2222"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect x="3" y="15" width="18" height="2" fill={color} />
      <path
        d="M8 8.66667V4.5C8 3.67157 8.67157 3 9.5 3H14.5C15.3284 3 16 3.67157 16 4.5V8.66667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
