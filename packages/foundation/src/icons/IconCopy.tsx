import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconCopy({
  size = 24,
  color = ColorGray900,
  variant = 'line',
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
        d="M26.6667 11.6665V8.33321C26.6667 6.49226 25.1743 4.99988 23.3334 4.99988H10C8.15907 4.99988 6.66669 6.49226 6.66669 8.33321V26.6665C6.66669 28.5075 8.15907 29.9999 10 29.9999H13.3334"
        stroke={color}
        strokeWidth="2.5"
      />
      <rect
        x="13.3334"
        y="11.6665"
        width="20"
        height="23.3333"
        rx="3.33333"
        stroke={color}
        strokeWidth="2.5"
      />
    </svg>
  );
}
