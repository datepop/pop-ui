import { ColorGray900, SemanticColorBgWhite } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconClock({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path fill={color} d="M-26-994h360V439H-26z" />
        <path fill={SemanticColorBgWhite} d="M-26-36h360v1159H-26z" />
        <g stroke={color} strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M11 8v4h4" />
        </g>
      </g>
    </svg>
  );
}
