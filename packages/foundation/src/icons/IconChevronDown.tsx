import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconChevronDown({
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
      <path
        d="M5.13486 12.6346C5.98099 11.7885 7.35284 11.7885 8.19898 12.6346L20.0002 24.4358L31.8014 12.6346C32.6476 11.7885 34.0194 11.7885 34.8655 12.6346C35.7117 13.4807 35.7117 14.8526 34.8655 15.6987L21.5323 29.032C20.6861 29.8781 19.3143 29.8781 18.4681 29.032L5.13486 15.6987C4.28873 14.8526 4.28873 13.4807 5.13486 12.6346Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
