import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconDownloadCircle({
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
      {variant === 'filled' ? (
        <>
          <circle cx="12" cy="12" r="10" fill={color} />
          <path d="M16 17H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <g>
            <path
              d="M15 11L12 14L9 11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 14L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
          <path d="M16.5 17H7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <g>
            <path
              d="M15 11L12 14L9 11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 14L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <path d="M16 16.5H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <g>
            <path
              d="M15 11L12 14L9 11"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 14L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </>
      )}
    </svg>
  );
}
