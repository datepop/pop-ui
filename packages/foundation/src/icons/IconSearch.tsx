import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconSearch({
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
        d="M10.1811 17.3621C14.147 17.3621 17.3621 14.147 17.3621 10.1811C17.3621 6.21507 14.147 3 10.1811 3C6.21507 3 3 6.21507 3 10.1811C3 14.147 6.21507 17.3621 10.1811 17.3621Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M15.2876 15.2876L21.0002 21.0002"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
