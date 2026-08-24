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
      {isFilled ? (
        <>
          <rect
            fill={color}
            height="4"
            rx="1"
            stroke={color}
            strokeWidth="1.5"
            transform="rotate(90 7 14)"
            width="7"
            x="7"
            y="14"
          />
          <rect
            fill={color}
            height="4"
            rx="1"
            stroke={color}
            strokeWidth="1.5"
            transform="rotate(90 14 3)"
            width="18"
            x="14"
            y="3"
          />
          <rect
            fill={color}
            height="4"
            rx="1"
            stroke={color}
            strokeWidth="1.5"
            transform="rotate(90 21 9)"
            width="12"
            x="21"
            y="9"
          />{' '}
        </>
      ) : (
        <>
          <rect
            height="4"
            rx="1"
            stroke={color}
            strokeWidth="1.5"
            transform="rotate(90 7 14)"
            width="7"
            x="7"
            y="14"
          />
          <rect
            height="4"
            rx="1"
            stroke={color}
            strokeWidth="1.5"
            transform="rotate(90 14 3)"
            width="18"
            x="14"
            y="3"
          />
          <rect
            height="4"
            rx="1"
            stroke={color}
            strokeWidth="1.5"
            transform="rotate(90 21 9)"
            width="12"
            x="21"
            y="9"
          />{' '}
        </>
      )}
    </svg>
  );
}
