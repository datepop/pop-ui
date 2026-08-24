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
      {isFilled ? (
        <>
          <path
            d="M3 11.5H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V11.5Z"
            fill={color}
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M7 3V5.5"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M17 3V5.5"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M5.25 5.5C5.25 6.4665 6.0335 7.25 7 7.25C7.9665 7.25 8.75 6.4665 8.75 5.5V4.25H15.25V5.5C15.25 6.4665 16.0335 7.25 17 7.25C17.9665 7.24995 18.75 6.46647 18.75 5.5V4.25H19C20.5188 4.25 21.75 5.48122 21.75 7V9C21.75 9.41421 21.4142 9.75 21 9.75H3C2.58579 9.75 2.25 9.41421 2.25 9V7C2.25 5.48122 3.48122 4.25 5 4.25H5.25V5.5Z"
            fill={color}
          />{' '}
        </>
      ) : (
        <>
          <rect height="16" rx="2" stroke={color} strokeWidth="1.5" width="18" x="3" y="5" />
          <path
            d="M3 10.5H21"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M7 3V6"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M17 3V6"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />{' '}
        </>
      )}
    </svg>
  );
}
