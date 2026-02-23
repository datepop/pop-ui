import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconGift({
  size = 24,
  color = ColorGray900,
  variant = 'line',
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
        d="M14 12H20V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V12H10"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="10"
        y="7"
        width="4"
        height="15"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M2 8L2 11C2 11.5523 2.44772 12 3 12L10 12L10 7L3 7C2.44772 7 2 7.44772 2 8Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M22 11L22 8C22 7.44772 21.5523 7 21 7L14 7L14 12L21 12C21.5523 12 22 11.5523 22 11Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12.5556 7C12.2487 7 12 6.75127 12 6.44444L12 6C12 3.79086 13.7909 2 16 2L16.3333 2C17.2538 2 18 2.74619 18 3.66667V3.66667C18 5.50762 16.5076 7 14.6667 7L12.5556 7Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M11.4444 7C11.7513 7 12 6.75127 12 6.44444L12 6C12 3.79086 10.2091 2 8 2L7.66667 2C6.74619 2 6 2.74619 6 3.66667V3.66667C6 5.50762 7.49238 7 9.33333 7L11.4444 7Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
