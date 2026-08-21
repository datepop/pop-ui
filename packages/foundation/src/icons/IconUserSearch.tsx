import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconUserSearch({
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
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            fill={color}
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M17 17L21 21"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M7 13.5C7 12.1193 8.11929 11 9.5 11H12.5C13.8807 11 15 12.1193 15 13.5V14C15 14.5523 14.5523 15 14 15H8C7.44772 15 7 14.5523 7 14V13.5Z"
            fill="white"
          />
          <path
            d="M11 10C12.1046 10 13 9.10457 13 8C13 6.89543 12.1046 6 11 6C9.89543 6 9 6.89543 9 8C9 9.10457 9.89543 10 11 10Z"
            fill="white"
          />{' '}
        </>
      ) : (
        <>
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M17 17L21 21"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M11 10.5C12.1046 10.5 13 9.60457 13 8.5C13 7.39543 12.1046 6.5 11 6.5C9.89543 6.5 9 7.39543 9 8.5C9 9.60457 9.89543 10.5 11 10.5Z"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M7 13.5C7 12.1193 8.11929 11 9.5 11H12.5C13.8807 11 15 12.1193 15 13.5V14C15 14.5523 14.5523 15 14 15H8C7.44772 15 7 14.5523 7 14V13.5Z"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.5"
          />{' '}
        </>
      )}
    </svg>
  );
}
