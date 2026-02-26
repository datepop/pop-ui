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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill={isFilled ? color : 'none'}
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M12 6.9L12 8.4"
        stroke={isFilled ? SemanticColorBgWhite : color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M12 9.6L12 16.8"
        stroke={isFilled ? SemanticColorBgWhite : color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
