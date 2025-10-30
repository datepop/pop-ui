import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconAnalytics({
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
        x="3.5"
        y="13.8889"
        width="3.77778"
        height="6.61111"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="10.1113"
        y="3.5"
        width="3.77778"
        height="17"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="16.7222"
        y="9.16675"
        width="3.77778"
        height="11.3333"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
