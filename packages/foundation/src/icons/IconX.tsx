import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconX({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.33 4.33a1.3 1.3 0 0 1 1.84 0L12 10.163l5.83-5.831a1.3 1.3 0 0 1 1.84 1.838L13.837 12l5.831 5.83a1.3 1.3 0 1 1-1.838 1.84L12 13.837 6.17 19.67a1.3 1.3 0 1 1-1.84-1.838L10.163 12 4.33 6.17a1.3 1.3 0 0 1 0-1.84"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
