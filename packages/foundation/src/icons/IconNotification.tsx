import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconNotification({
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
        d="M25.3832 30.2916C25.3832 33.2416 22.9832 35.6416 20.0332 35.6416C17.0832 35.6416 14.6832 33.2416 14.6832 30.2916"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        fill={filled ? color : "none"}
        strokeWidth={filled ? 0 : 2.5}
      />
      <path
        d="M32.3833 30.2916H7.59997C6.26664 30.2916 5.39997 28.9083 5.9833 27.7083L8.1333 23.3249C8.24997 23.0749 8.31664 22.8083 8.31664 22.5416V16.0416C8.31664 9.59161 13.55 4.35828 20 4.35828C26.45 4.35828 31.6833 9.59161 31.6833 16.0416V22.5416C31.6833 22.8083 31.75 23.0916 31.8666 23.3249L34.0166 27.7083C34.6 28.8916 33.7333 30.2916 32.4 30.2916H32.3833Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={filled ? color : "none"}
        strokeWidth={filled ? 0 : 2.5}
      />
    </svg>
  );
}
