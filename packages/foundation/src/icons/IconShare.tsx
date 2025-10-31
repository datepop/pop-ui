import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconShare({
  size = 24,
  color = ColorGray900,
  filled = false,
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
        d="M30.8748 13.4917C33.4153 13.4917 35.4748 11.4322 35.4748 8.89169C35.4748 6.35118 33.4153 4.29169 30.8748 4.29169C28.3343 4.29169 26.2748 6.35118 26.2748 8.89169C26.2748 11.4322 28.3343 13.4917 30.8748 13.4917Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={filled ? color : "none"}
        strokeWidth={filled ? 0 : 2.5}
      />
      <path
        d="M8.89152 24.625C11.432 24.625 13.4915 22.5655 13.4915 20.025C13.4915 17.4845 11.432 15.425 8.89152 15.425C6.35101 15.425 4.2915 17.4845 4.2915 20.025C4.2915 22.5655 6.35101 24.625 8.89152 24.625Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={filled ? color : "none"}
        strokeWidth={filled ? 0 : 2.5}
      />
      <path
        d="M31.1082 35.7084C33.6487 35.7084 35.7082 33.6489 35.7082 31.1084C35.7082 28.5679 33.6487 26.5084 31.1082 26.5084C28.5677 26.5084 26.5082 28.5679 26.5082 31.1084C26.5082 33.6489 28.5677 35.7084 31.1082 35.7084Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={filled ? color : "none"}
        strokeWidth={filled ? 0 : 2.5}
      />
      <path
        d="M13.0082 22.075L26.9915 29.0583"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
      />
      <path
        d="M26.7748 10.975L12.9915 17.9417"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
