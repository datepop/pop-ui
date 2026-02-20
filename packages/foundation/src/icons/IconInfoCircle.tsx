import { ColorGray900, SemanticColorBgWhite } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconInfoCircle({
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
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="10"
        cy="10"
        r="7.5"
        fill={isFilled ? color : 'none'}
        stroke={isFilled ? undefined : color}
        strokeWidth={isFilled ? 0 : 1.25}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M10 5.75L10 7"
        stroke={isFilled ? SemanticColorBgWhite : color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
      />
      <path
        d="M10 8L10 14"
        stroke={isFilled ? SemanticColorBgWhite : color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
