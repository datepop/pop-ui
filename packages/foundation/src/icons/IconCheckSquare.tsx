import { ColorGray900, SemanticColorBgWhite } from "../tokens/colors";

import type { IconProps } from "../types/icon";

interface IconCheckSquareProps extends IconProps {
  checkColor?: string;
}

export default function IconCheckSquare({
  size = 24,
  color = ColorGray900,
  checkColor = SemanticColorBgWhite,
  ...props
}: IconCheckSquareProps) {
  return (
    <svg
      width={size - 1}
      height={size}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y="0.5" width={size - 1} height={size - 1} rx="2.25" fill={color} />
      <path
        d="M3.93945 9.5L7.51298 12.875L14.0645 6.125"
        stroke={checkColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
