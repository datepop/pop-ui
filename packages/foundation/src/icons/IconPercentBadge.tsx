import { ColorGray900 } from '../tokens/colors';
import type { IIconProps } from '../types/icon';

export default function IconPercentBadge({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.67 2.521a2 2 0 0 1 2.664 0l2.581 2.306a2 2 0 0 0 1.22.506l3.455.194a2 2 0 0 1 1.885 1.884l.194 3.455a2 2 0 0 0 .506 1.22l2.305 2.581a2 2 0 0 1 0 2.665l-2.305 2.58a2 2 0 0 0-.506 1.221l-.194 3.455a2 2 0 0 1-1.885 1.885l-3.455.194a2 2 0 0 0-1.22.505l-2.58 2.306a2 2 0 0 1-2.666 0l-2.58-2.306a2 2 0 0 0-1.22-.505l-3.455-.194a2 2 0 0 1-1.885-1.885l-.194-3.455a2 2 0 0 0-.506-1.22l-2.305-2.58a2 2 0 0 1 0-2.666l2.305-2.58a2 2 0 0 0 .506-1.22l.194-3.456a2 2 0 0 1 1.885-1.884l3.455-.194a2 2 0 0 0 1.22-.506z"
        fill={color}
        strokeWidth={0}
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.4"
        d="m12.327 19.672 7.343-7.344"
      />
      <circle cx="19.671" cy="19.672" r="2.229" fill="#fff" />
      <circle cx="12.33" cy="12.328" r="2.229" fill="#fff" />
    </svg>
  );
}