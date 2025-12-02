import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconCalendarCancel({
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
        d="M20.5 16V7.2778C20.5 6.2346 19.6543 5.38892 18.6111 5.38892H9.5M15 20.5L5.38889 20.5C4.34569 20.5 3.5 19.6543 3.5 18.6111V8.5M4.5 4.5L20.5 20.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.7227 3.5V6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.5 10.75H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.0625 10.75H20.2129" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
