import { ColorGray900, SemanticColorBgWhite } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconCloseCircle({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  const strokeWidth = 2;
  const center = size / 2;
  const crossSize = size * 0.15;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={center} cy={center} r={center} fill={color} />
      <path
        d={`M${center - crossSize},${center - crossSize} L${center + crossSize},${center + crossSize}`}
        stroke={SemanticColorBgWhite}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d={`M${center + crossSize},${center - crossSize} L${center - crossSize},${center + crossSize}`}
        stroke={SemanticColorBgWhite}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
