import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconCompass({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.5" />
      <path d="M11 8v4h4" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
