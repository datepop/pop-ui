import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconCamera({
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
        d="M18 20H6C4.34315 20 3 18.6569 3 17V9.60465C3 7.9478 4.34315 6.60465 6 6.60465H7.16107C7.36573 6.60465 7.54973 6.47993 7.62552 6.28982L8.03638 5.25931C8.33956 4.49889 9.07554 4 9.89417 4H14.1058C14.9245 4 15.6604 4.49889 15.9636 5.25931L16.3745 6.28982C16.4503 6.47993 16.6343 6.60465 16.8389 6.60465H18C19.6569 6.60465 21 7.9478 21 9.60465V17C21 18.6569 19.6569 20 18 20Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="12" cy="13" r="3" stroke={color} strokeWidth="1.5" />
      <ellipse
        cx="16.5211"
        cy="9.54499"
        rx="0.753488"
        ry="0.739322"
        fill={color}
        stroke={color}
      />
    </svg>
  );
}
