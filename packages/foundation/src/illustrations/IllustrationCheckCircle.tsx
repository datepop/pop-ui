import { useId } from 'react';

import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationCheckCircle({ size = 24, ...props }: IIllustrationProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33DAE8" />
          <stop offset="1" stopColor="#00C8C0" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill={`url(#${gradientId})`} />
      <path
        d="M6.6 12.6L10.2 16.2L17.4 8.4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
