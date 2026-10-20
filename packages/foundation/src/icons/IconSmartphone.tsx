import { useId } from 'react';

import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

const SPEAKER_PATH = 'M10.25 5.25H13.75';

export default function IconSmartphone({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';
  const maskId = useId();

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
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="white" />
            <path d={SPEAKER_PATH} stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </mask>
          <g mask={`url(#${maskId})`}>
            <rect
              x="6.5"
              y="2.75"
              width="11"
              height="18.5"
              rx="2"
              fill={color}
              stroke={color}
              strokeWidth="1.5"
            />
          </g>
        </>
      ) : (
        <>
          <rect x="6.5" y="2.75" width="11" height="18.5" rx="2" stroke={color} strokeWidth="1.5" />
          <path d={SPEAKER_PATH} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
