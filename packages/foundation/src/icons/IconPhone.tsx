import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconPhone({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="5.15039"
        y="1.50391"
        width="13.6986"
        height="22.9916"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M9.79688 4.54102H14.2482" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
