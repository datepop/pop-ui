import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

const getStrokeWidth = (size: number) => {
  if (size >= 40) return 2.5;
  if (size >= 32) return 2;
  if (size >= 24) return 1.5;
  if (size >= 20) return 1.25;
  return 1;
};

export default function IconReset({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  const strokeWidth = getStrokeWidth(size);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 11.5661C3.1118 13.4197 5.18983 14.6668 7.56988 14.6668C11.1211 14.6668 14 11.8903 14 8.46528C14 5.04026 11.1211 2.26373 7.56988 2.26373C5.18983 2.26373 3.1118 3.51086 2 5.3645M2 5.3645V1.3335M2 5.3645H5.6408"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
