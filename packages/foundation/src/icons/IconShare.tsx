import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconShare({
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
      <path
        d="M18.5249 8.095C20.0492 8.095 21.2849 6.8593 21.2849 5.335C21.2849 3.8107 20.0492 2.575 18.5249 2.575C17.0006 2.575 15.7649 3.8107 15.7649 5.335C15.7649 6.8593 17.0006 8.095 18.5249 8.095Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 1.5}
      />
      <path
        d="M5.3349 14.775C6.8592 14.775 8.0949 13.5393 8.0949 12.015C8.0949 10.4907 6.8592 9.255 5.3349 9.255C3.8106 9.255 2.5749 10.4907 2.5749 12.015C2.5749 13.5393 3.8106 14.775 5.3349 14.775Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 1.5}
      />
      <path
        d="M18.6649 21.425C20.1892 21.425 21.4249 20.1893 21.4249 18.665C21.4249 17.1407 20.1892 15.905 18.6649 15.905C17.1406 15.905 15.9049 17.1407 15.9049 18.665C15.9049 20.1893 17.1406 21.425 18.6649 21.425Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 1.5}
      />
      <path
        d="M7.8049 13.245L16.1949 17.435"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M16.0649 6.585L7.7949 10.765"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
