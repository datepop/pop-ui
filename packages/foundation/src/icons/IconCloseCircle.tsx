import { ColorGray900, SemanticColorBgWhite } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconCloseCircle({
  size = 24,
  color = ColorGray900,
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
      <circle cx="12" cy="12" r="9" fill={color} strokeWidth={0} />
      <rect
        x="14.8284"
        y="7.75781"
        width="2"
        height="10"
        rx="1"
        transform="rotate(45 14.8284 7.75781)"
        fill={SemanticColorBgWhite}
        strokeWidth={0}
      />
      <rect
        width="2"
        height="10"
        rx="1"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 9.17139 7.75781)"
        fill={SemanticColorBgWhite}
        strokeWidth={0}
      />
    </svg>
  );
}
