import { useId } from 'react';

import type { IBrandIconProps } from '../types/brand';

export default function IconNaver({ size = 24, ...props }: IBrandIconProps) {
  const clipId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="12" cy="12" r="9.9" fill="#00C73C" />
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M13.7797 12.3521L10.0726 7H6.99927V17H10.2184V11.6483L13.9259 17H16.9993V7H13.7797V12.3521Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="10" height="10" fill="white" transform="translate(6.99927 7)" />
        </clipPath>
      </defs>
    </svg>
  );
}
