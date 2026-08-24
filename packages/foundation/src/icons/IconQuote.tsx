import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconQuote({
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
      <circle
        cx="7.41494"
        cy="15.4772"
        r="2.5"
        fill={isFilled ? color : 'none'}
        stroke={color}
        strokeWidth="1.5"
        transform="rotate(30 7.41494 15.4772)"
      />
      <path d="M5.24988 14.2272L9.99988 6" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <circle
        cx="16.08"
        cy="15.4772"
        r="2.5"
        fill={isFilled ? color : 'none'}
        stroke={color}
        strokeWidth="1.5"
        transform="rotate(30 16.08 15.4772)"
      />
      <path d="M13.9149 14.2272L18.6649 6" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}
