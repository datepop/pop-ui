import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconCopy({
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
      <path
        d="M8.5 9C8.5 7.89543 9.39543 7 10.5 7H18C19.1046 7 20 7.89543 20 9V19C20 20.1046 19.1046 21 18 21H10.5C9.39543 21 8.5 20.1046 8.5 19V9Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M15.5 7V5C15.5 3.89543 14.6046 3 13.5 3H6C4.89543 3 4 3.89543 4 5V15C4 16.1046 4.89543 17 6 17H8.5"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
