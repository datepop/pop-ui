import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconPhoto({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="6.66669"
        y="6.66663"
        width="26.6667"
        height="26.6667"
        rx="3.33333"
        stroke={color}
        strokeWidth="2.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0366 14.074C17.0366 15.7112 15.7108 17.037 14.0736 17.037C12.4381 17.037 11.1107 15.7112 11.1107 14.074C11.1107 12.4369 12.4381 11.1111 14.0736 11.1111C15.7092 11.1127 17.035 12.4385 17.0366 14.074Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66669 27.4073L10.7059 24.3779C11.8365 23.5299 13.379 23.4871 14.5549 24.2711L14.9661 24.5452C16.1944 25.3641 17.815 25.2775 18.9491 24.3325L23.9682 20.1499C25.1238 19.1869 26.7813 19.1172 28.0137 19.9799L33.3334 23.7036"
        stroke={color}
        strokeWidth="2.5"
      />
    </svg>
  );
}
