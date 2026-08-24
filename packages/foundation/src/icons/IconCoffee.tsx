import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconCoffee({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
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
        d="M5.51101 8.06456C5.47205 7.76531 5.70505 7.5 6.00682 7.5H17.9932C18.295 7.5 18.528 7.76531 18.489 8.06456L17.0567 19.0646C17.0243 19.3136 16.8121 19.5 16.5609 19.5H7.43912C7.18793 19.5 6.97573 19.3136 6.9433 19.0646L5.51101 8.06456Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M8 19.5H16L15.8238 20.6513C15.749 21.1395 15.3291 21.5 14.8353 21.5H9.15263C8.65486 21.5 8.23287 21.1339 8.16264 20.6411L8 19.5Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect height="3" rx="0.5" stroke={color} strokeWidth="1.5" width="15" x="4.5" y="4.5" />
      <path
        d="M6.24728 3.02C6.4227 2.69938 6.75907 2.5 7.12455 2.5H16.8755C17.2409 2.5 17.5773 2.69938 17.7527 3.02L18.5625 4.5H5.4375L6.24728 3.02Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
