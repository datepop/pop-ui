import { ColorGray900, SemanticColorBgWhite } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconCheckCircle({
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
      <path
        d="M8.24878 12L11.2488 15L16.5 9.5"
        stroke={SemanticColorBgWhite}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
