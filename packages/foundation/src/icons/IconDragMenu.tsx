import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconDragMenu({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="9.5" cy="5.5" r="1.5" fill={color} />
      <circle cx="14.5" cy="5.5" r="1.5" fill={color} />
      <circle cx="9.5" cy="11.5" r="1.5" fill={color} />
      <circle cx="14.5" cy="11.5" r="1.5" fill={color} />
      <circle cx="9.5" cy="17.5" r="1.5" fill={color} />
      <circle cx="14.5" cy="17.5" r="1.5" fill={color} />
    </svg>
  );
}
