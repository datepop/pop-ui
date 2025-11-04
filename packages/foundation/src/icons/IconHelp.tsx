import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconHelp({
  size = 24,
  color = ColorGray900,
  filled: _filled = false,
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
      <path
        d="M8.33331 30.2249V18.3333C8.33331 11.89 13.5567 6.66663 20 6.66663C26.4433 6.66663 31.6666 11.89 31.6666 18.3333V26.8817C31.6666 28.0269 30.696 33.3333 24.1764 33.3333"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 20.8333C2.5 17.6117 5.11167 15 8.33333 15V27.5C5.11167 27.5 2.5 24.8883 2.5 21.6667V20.8333Z"
        fill={color}
      />
      <path
        d="M37.5 20.8333C37.5 17.6117 34.8883 15 31.6667 15V27.5C34.8883 27.5 37.5 24.8883 37.5 21.6667V20.8333Z"
        fill={color}
      />
      <circle cx="15.4167" cy="19.1666" r="1.25" fill={color} />
      <circle cx="24.5834" cy="19.1666" r="1.25" fill={color} />
      <path
        d="M16.6666 26.6666C16.6666 26.6666 17.6363 28.3333 20 28.3333C22.3636 28.3333 23.3333 26.6666 23.3333 26.6666"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
      />
    </svg>
  );
}
