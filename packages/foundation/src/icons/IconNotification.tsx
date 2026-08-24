import { useId } from 'react';

import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconNotification({
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
            <path d="M8.25 18.5H15.75" stroke="black" strokeWidth="1.5" />
          </mask>
          <g mask={`url(#${maskId})`}>
            <path
              d="M15 18.5C15 20.1542 13.6542 21.5 12 21.5C10.3458 21.5 9 20.1542 9 18.5"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.5"
              fill={color}
            />
            <path
              d="M19.8477 18.2815H4.14175C3.29677 18.2815 2.74754 17.428 3.11722 16.6877L4.47974 13.9833C4.55367 13.829 4.59592 13.6645 4.59592 13.5L4.59588 9.70823C4.59588 5.72879 7.9124 2.5 12 2.5C16.0875 2.5 19.404 5.72879 19.404 9.70823L19.4041 13.5C19.4041 13.6645 19.4463 13.8393 19.5203 13.9833L20.8828 16.6877C21.2525 17.4177 20.7032 18.2815 19.8583 18.2815H19.8477Z"
              stroke={color}
              strokeMiterlimit="10"
              strokeWidth="1.5"
              fill={color}
            />
          </g>{' '}
        </>
      ) : (
        <>
          <path
            d="M15 18.5C15 20.1542 13.6542 21.5 12 21.5C10.3458 21.5 9 20.1542 9 18.5"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M19.8477 18.2815H4.14175C3.29677 18.2815 2.74754 17.428 3.11722 16.6877L4.47974 13.9833C4.55367 13.829 4.59592 13.6645 4.59592 13.5L4.59588 9.70823C4.59588 5.72879 7.9124 2.5 12 2.5C16.0875 2.5 19.404 5.72879 19.404 9.70823L19.4041 13.5C19.4041 13.6645 19.4463 13.8393 19.5203 13.9833L20.8828 16.6877C21.2525 17.4177 20.7032 18.2815 19.8583 18.2815H19.8477Z"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />{' '}
        </>
      )}
    </svg>
  );
}
