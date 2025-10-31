import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconDown({
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
      <path
        d="M10.9319 17.5704C11.4651 18.2841 12.5349 18.2841 13.0681 17.5704L19.9338 8.38139C20.5908 7.5021 19.9633 6.25 18.8657 6.25L5.13433 6.25C4.03672 6.25 3.40924 7.5021 4.06621 8.38139L10.9319 17.5704Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
