import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconLink({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 25) / 24}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.405 4.79629L18.3142 4.79628L18.3974 7.7079"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3142 4.79626L13.2667 9.84415"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.4023 4.80005H7C5.89543 4.80005 5 5.69548 5 6.80005V19C5 20.1046 5.89543 21 7 21H16.5C17.6046 21 18.5 20.1046 18.5 19V11.7627"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
