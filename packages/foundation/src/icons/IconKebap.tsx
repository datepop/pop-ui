import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

const getStrokeWidth = (size: number) => {
  if (size >= 40) return 2.5;
  if (size >= 32) return 2;
  if (size >= 24) return 1.5;
  if (size >= 20) return 1.25;
  return 1;
};

export default function IconKebap({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  const strokeWidth = getStrokeWidth(size);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20.8333" cy="9.16669" r={strokeWidth * 2} fill={color} />
      <circle cx="20.8333" cy="19.1667" r={strokeWidth * 2} fill={color} />
      <circle cx="20.8333" cy="29.1667" r={strokeWidth * 2} fill={color} />
    </svg>
  );
}
