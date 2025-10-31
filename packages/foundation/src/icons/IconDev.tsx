import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconDev({
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
      <rect
        x="5"
        y="6.66663"
        width="30"
        height="22.0776"
        rx="3.33333"
        stroke={color}
        strokeWidth="2.5"
      />
      <path
        d="M16.2256 14.5514L13.1481 17.4632C13.0092 17.5947 13.0092 17.816 13.1481 17.9475L16.2256 20.8593"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M23.7744 14.5514L26.8519 17.4632C26.9908 17.5947 26.9908 17.816 26.8519 17.9475L23.7744 20.8593"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="13.3333"
        y="32.6345"
        width="13.3333"
        height="2.36546"
        rx="1.18273"
        fill={color}
      />
    </svg>
  );
}
