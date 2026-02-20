import { ColorGray900, SemanticColorBgWhite } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconCheckCircle({
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
        stroke={isFilled ? undefined : color}
        strokeWidth={isFilled ? 0 : 1.5}
      />
      <path
        d="M8.24878 12L11.2488 15L16.5 9.5"
        stroke={isFilled ? SemanticColorBgWhite : color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
