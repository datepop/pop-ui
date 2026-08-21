import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconUserDouble({
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
            d="M10.3457 12.25C13.9238 12.25 16.75 15.3147 16.75 19C16.75 20.4762 15.6117 21.75 14.1152 21.75H3.88477C2.38834 21.75 1.25 20.4762 1.25 19C1.25 15.3147 4.07619 12.25 7.6543 12.25H10.3457Z"
            fill={color}
          />
          <path
            d="M9 10.5C10.933 10.5 12.5 8.933 12.5 7C12.5 5.067 10.933 3.5 9 3.5C7.067 3.5 5.5 5.067 5.5 7C5.5 8.933 7.067 10.5 9 10.5Z"
            fill={color}
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M17.5 10C18.8807 10 20 8.88071 20 7.5C20 6.11929 18.8807 5 17.5 5C16.1193 5 15 6.11929 15 7.5C15 8.88071 16.1193 10 17.5 10Z"
            fill={color}
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M18.0005 11.75C20.2787 11.7502 23.0005 13.4885 23.0005 16.5C23.0005 17.5767 22.2762 18.7495 21.0522 18.75H18.2437C18.166 16.0823 16.8544 13.6572 14.8218 12.1934C15.4513 11.9071 16.1824 11.75 17.0005 11.75H18.0005Z"
            fill={color}
          />{' '}
        </>
      ) : (
        <>
          <path
            d="M9 10.5C10.933 10.5 12.5 8.933 12.5 7C12.5 5.067 10.933 3.5 9 3.5C7.067 3.5 5.5 5.067 5.5 7C5.5 8.933 7.067 10.5 9 10.5Z"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M2 19C2 15.6863 4.53131 13 7.65385 13H10.3462C13.4687 13 16 15.6863 16 19C16 20.1046 15.1562 21 14.1154 21H3.88462C2.84377 21 2 20.1046 2 19Z"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M17.5 10C18.8807 10 20 8.88071 20 7.5C20 6.11929 18.8807 5 17.5 5C16.1193 5 15 6.11929 15 7.5C15 8.88071 16.1193 10 17.5 10Z"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M16 18H21.0513C21.7133 18 22.25 17.3284 22.25 16.5C22.25 14.0147 19.986 12.5 18 12.5L17 12.5C15.5 12.5 14.406 13.09 13.75 14.002"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.5"
          />{' '}
        </>
      )}
    </svg>
  );
}
