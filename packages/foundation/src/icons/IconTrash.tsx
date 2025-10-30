import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconTrash({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.0112 11.0083H20.4933V20.3591C20.4933 21.1467 19.8489 21.7911 19.0613 21.7911H11.4432C10.6556 21.7911 10.0112 21.1467 10.0112 20.3591V11.0083Z"
        stroke={color}
        strokeMiterlimit="10"
      />
      <path
        d="M13.5479 12.7339V20.0728"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M16.9561 12.7339V20.0728"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M20.472 9.12549H10.1116C9.58964 9.12549 9.1665 9.54702 9.1665 10.067C9.1665 10.587 9.58964 11.0085 10.1116 11.0085H20.472C20.994 11.0085 21.4171 10.587 21.4171 10.067C21.4171 9.54702 20.994 9.12549 20.472 9.12549Z"
        stroke={color}
        strokeMiterlimit="10"
      />
      <path
        d="M13.0542 9.21838V8.35919C13.0542 7.88663 13.448 7.5 13.9349 7.5H16.5769C17.0637 7.5 17.4575 7.88663 17.4575 8.35919V9.21838"
        stroke={color}
        strokeMiterlimit="10"
      />
    </svg>
  );
}
