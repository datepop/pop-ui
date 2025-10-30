import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconChevronUp({
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
      <path
        d="M15 12L9 6L3 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
