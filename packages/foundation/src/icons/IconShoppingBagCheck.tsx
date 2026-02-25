import { useId } from 'react';

import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconShoppingBagCheck({
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
      {isFilled && (
        <mask id={maskId}>
          <path
            d="M18.91 22.605H5.10001C3.95001 22.605 3.02002 21.645 3.02002 20.455L4.06001 7.54502C4.06001 6.35502 4.99001 5.39502 6.14001 5.39502H17.86C19.01 5.39502 19.94 6.35502 19.94 7.54502L20.98 20.455C20.98 21.645 20.05 22.605 18.9 22.605H18.91Z"
            fill="white"
          />
          <path
            d="M9.46997 13.205L11.03 16.325L15.71 11.645"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </mask>
      )}
      <path
        d="M18.91 22.605H5.10001C3.95001 22.605 3.02002 21.645 3.02002 20.455L4.06001 7.54502C4.06001 6.35502 4.99001 5.39502 6.14001 5.39502H17.86C19.01 5.39502 19.94 6.35502 19.94 7.54502L20.98 20.455C20.98 21.645 20.05 22.605 18.9 22.605H18.91Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        mask={isFilled ? `url(#${maskId})` : undefined}
      />
      <path
        d="M8.31006 6.70502V5.09502C8.31006 3.05502 9.97006 1.39502 12.0101 1.39502C14.0501 1.39502 15.7101 3.05502 15.7101 5.09502V6.70502"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      {!isFilled && (
        <path
          d="M9.46997 13.205L11.03 16.325L15.71 11.645"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
