
import { ColorGray900, SemanticColorBgWhite } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconPlayCircle({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <circle
        cx="16"
        cy="16"
        r="15"
        fill={isFilled ? color : 'none'}
        stroke={color}
        opacity={isFilled ? 0.6 : 1}
        strokeWidth="2"
      />
      <path
        fill={isFilled ? SemanticColorBgWhite : color}
        d="M21.824 15.338c.429.337.429.987 0 1.325l-7.128 5.6a.842.842 0 0 1-1.363-.662V10.4a.842.842 0 0 1 1.363-.663z"
      />
    </svg>
  );
}