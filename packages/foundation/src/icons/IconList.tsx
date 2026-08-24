import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconList({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect height="7.41176" rx="2" stroke={color} strokeWidth="1.5" width="18" x="3" y="3" />
      <rect height="7.41176" rx="2" stroke={color} strokeWidth="1.5" width="18" x="3" y="13.5881" />
    </svg>
  );
}
