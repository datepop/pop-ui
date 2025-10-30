import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconPlus({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7 1.75V12.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1.75 7L12.25 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
