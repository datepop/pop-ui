import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconReset({
  size = 24,
  color = ColorGray900,
  variant = 'line',
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
        d="M3 17.3487C4.6677 20.1293 7.7847 21.9999 11.3548 21.9999C16.6817 21.9999 21 17.8352 21 12.6975C21 7.56 16.6817 3.3952 11.3548 3.3952C7.7847 3.3952 4.6677 5.2659 3 8.0464M3 8.0464V2M3 8.0464H8.4612"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
