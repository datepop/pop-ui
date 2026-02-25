import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconBookmark({
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
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M29.9833 35.4403L20.9833 29.0236C20.4 28.607 19.5833 28.607 19 29.0236L9.99995 35.4403C8.93329 36.207 7.3833 35.507 7.3833 34.257V7.22363C7.3833 5.57363 8.8333 4.22363 10.6333 4.22363H29.3666C31.1666 4.22363 32.6166 5.57363 32.6166 7.22363V34.2736C32.6166 35.5236 31.0666 36.2236 30 35.457L29.9833 35.4403Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 2.5}
      />
    </svg>
  );
}
