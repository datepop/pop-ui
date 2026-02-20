import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconCoffee({
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
        d="M5.66849 8.99768C5.64033 8.70402 5.87121 8.44995 6.16621 8.44995H17.834C18.129 8.44995 18.3599 8.70403 18.3318 8.99768L17.3636 19.094C17.339 19.3504 17.1236 19.5462 16.8659 19.5462H7.13434C6.87669 19.5462 6.66122 19.3504 6.63662 19.094L5.66849 8.99768Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M7.62549 19.5461H16.3746L16.153 21.2504C16.0882 21.7487 15.6638 22.1215 15.1613 22.1215H8.82348C8.31767 22.1215 7.89151 21.7438 7.83073 21.2417L7.62549 19.5461Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M6.22729 6.67871H17.7728L17.5687 8.44994H6.39345L6.22729 6.67871Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="4.67627"
        y="4.27856"
        width="14.6476"
        height="2.40016"
        rx="0.5"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M6.74665 2.49382C6.90191 2.12117 7.26603 1.87842 7.66974 1.87842H16.3304C16.7341 1.87842 17.0982 2.12117 17.2535 2.49382L17.9971 4.27858H6.00305L6.74665 2.49382Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
