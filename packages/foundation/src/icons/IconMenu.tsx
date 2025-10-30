import { ColorGray900, SemanticColorBgWhite } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconMenu({
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
      <g transform="translate(3 2)" strokeWidth="1.5">
        <rect stroke={color} y="1.252" width="15.113" height="16.118" rx="1" />
        <path stroke={color} d="M3.492 6.585h8.129M3.492 9.892h8.129M3.492 13.204h8.129" />
        <path
          stroke={color}
          fill={SemanticColorBgWhite}
          fillRule="nonzero"
          d="M3.492 0h8.135v3.279H3.492z"
        />
      </g>
    </svg>
  );
}
