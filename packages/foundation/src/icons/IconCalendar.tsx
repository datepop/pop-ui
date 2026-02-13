import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconCalendar({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3" y="5.77771" width="18" height="16" rx="2" stroke={color} strokeWidth="1.5" />
      <path
        d="M7 3.77771V5.77771"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 3.77771V5.77771"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="3" y="10" width="18" height="1.5" fill={isFilled ? undefined : color} />
      <rect
        x="3.70044"
        y="6.26282"
        width="16.8291"
        height="4.51416"
        stroke={isFilled ? color : undefined}
        fill={isFilled ? color : undefined}
      />
    </svg>
  );
}
