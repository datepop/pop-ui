import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconInfoCircle({
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
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            fill={color}
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path d="M12 16.5V11.5" stroke="white" strokeLinecap="round" strokeWidth="1.5" />
          <circle cx="1" cy="1" fill="white" r="1" transform="matrix(1 0 0 -1 11 9.5)" />{' '}
        </>
      ) : (
        <>
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path d="M12 16.5V11.5" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
          <circle cx="1" cy="1" fill={color} r="1" transform="matrix(1 0 0 -1 11 9.5)" />{' '}
        </>
      )}
    </svg>
  );
}
