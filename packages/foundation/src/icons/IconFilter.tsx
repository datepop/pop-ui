import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

const getStrokeWidth = (size: number) => {
  if (size >= 40) return 2.5;
  if (size >= 32) return 2;
  if (size >= 24) return 1.5;
  if (size >= 20) return 1.25;
  return 1;
};

export default function IconFilter({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  const strokeWidth = getStrokeWidth(size);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 6.6665H10.8879M17.5 6.6665H15.8028"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M17.5 13.3335H9.11303M2.5 13.3335H4.19809"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="13.3332" cy="6.66667" r="2.29167" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="6.66667" cy="13.3332" r="2.29167" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}
