import { ColorGray900, SemanticColorBgWhite } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconPlusCircle({
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
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(1 1)" fill="none" fillRule="evenodd">
        <circle
          cx="10"
          cy="10"
          r="10"
          fill={isFilled ? color : 'none'}
          stroke={color}
          strokeWidth="1"
        />
        <path
          strokeLinecap="round"
          d="M10 5v10M15 10H5"
          stroke={isFilled ? SemanticColorBgWhite : color}
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
