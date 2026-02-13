import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconWarningCircle({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="31.5625" cy="31.5625" r="17.1875" strokeWidth={0} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 5C16.2147 5 5 16.2147 5 30C5 43.7853 16.2147 55 30 55C43.7853 55 55 43.7853 55 30C55 16.2147 43.7853 5 30 5ZM30.0115 38.2232C31.6379 38.2232 32.9526 39.5379 32.9526 41.1644C32.9526 42.7909 31.6379 44.1056 30.0115 44.1056C28.385 44.1056 27.0556 42.7909 27.0556 41.1644C27.0556 39.5379 28.3585 38.2232 29.9821 38.2232H30.0115ZM29.9826 16.6294C31.2003 16.6294 32.1885 17.6176 32.1885 18.8353V31.8324C32.1885 33.05 31.2003 34.0382 29.9826 34.0382C28.765 34.0382 27.7768 33.05 27.7768 31.8324V18.8353C27.7768 17.6176 28.765 16.6294 29.9826 16.6294Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
