import { ColorGray900, SemanticColorBgWhite } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconPlusSquare({
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
      <rect x="0.75" y="0.75" width={size - 1.5} height={size - 1.5} rx="3.25" fill={SemanticColorBgWhite} />
      <rect
        x="0.75"
        y="0.75"
        width={size - 1.5}
        height={size - 1.5}
        rx="3.25"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d={`M${size / 2} ${size * 0.3}V${size * 0.7}`} stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d={`M${size * 0.3} ${size / 2}L${size * 0.7} ${size / 2}`} stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
