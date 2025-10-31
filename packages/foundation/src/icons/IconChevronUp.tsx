import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconChevronUp({
  size = 24,
  color = ColorGray900,
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.13488 29.032C5.98101 29.8782 7.35287 29.8782 8.199 29.032L20.0003 17.2308L31.8015 29.032C32.6477 29.8782 34.0195 29.8782 34.8656 29.032C35.7118 28.1859 35.7118 26.814 34.8656 25.9679L21.5323 12.6346C20.6862 11.7884 19.3143 11.7884 18.4682 12.6346L5.13488 25.9679C4.28874 26.814 4.28874 28.1859 5.13488 29.032Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
