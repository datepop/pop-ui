import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconChartBar({
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
      <rect
        x="3.5"
        y="13.8889"
        width="3.77778"
        height="6.61111"
        rx="1"
        stroke={color}
        strokeWidth={isFilled ? 0 : 1.5}
        fill={isFilled ? color : undefined}
      />
      <rect
        x="10.1113"
        y="3.5"
        width="3.77778"
        height="17"
        rx="1"
        stroke={color}
        strokeWidth={isFilled ? 0 : 1.5}
        fill={isFilled ? color : undefined}
      />
      <rect
        x="16.7222"
        y="9.16675"
        width="3.77778"
        height="11.3333"
        rx="1"
        stroke={color}
        strokeWidth={isFilled ? 0 : 1.5}
        fill={isFilled ? color : undefined}
      />
    </svg>
  );
}
