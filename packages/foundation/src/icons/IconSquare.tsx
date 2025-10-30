import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconSquare({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size - 1}
      height={size}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="1.5" width="16" height="16" rx="1.25" stroke={color} strokeWidth="2" />
    </svg>
  );
}
