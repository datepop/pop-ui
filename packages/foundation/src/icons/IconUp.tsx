import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconUp({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
  ...props
}: IIconProps) {
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
        d="M10.9319 6.42958C11.4651 5.71587 12.5349 5.71587 13.0681 6.42958L19.9338 15.6186C20.5908 16.4979 19.9633 17.75 18.8657 17.75L5.13433 17.75C4.03672 17.75 3.40924 16.4979 4.06621 15.6186L10.9319 6.42958Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
