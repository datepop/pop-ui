import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconPlus({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.9999 2.80568C21.1381 2.80568 22.0608 3.72837 22.0608 4.86658L22.0608 17.9389L35.1331 17.9389C36.2713 17.9389 37.194 18.8616 37.194 19.9998C37.194 21.138 36.2713 22.0607 35.1331 22.0607L22.0608 22.0607L22.0608 35.1331C22.0608 36.2713 21.1381 37.194 19.9999 37.194C18.8617 37.194 17.939 36.2713 17.939 35.1331L17.939 22.0607L4.86662 22.0607C3.72841 22.0607 2.80572 21.138 2.80572 19.9998C2.80572 18.8616 3.72842 17.9389 4.86662 17.9389L17.939 17.9389L17.939 4.86658C17.939 3.72838 18.8617 2.80568 19.9999 2.80568Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
