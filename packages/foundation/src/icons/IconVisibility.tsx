import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconVisibility({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8.449a3.551 3.551 0 1 0 0 7.102 3.551 3.551 0 0 0 0-7.102M9.948 12a2.051 2.051 0 1 1 4.103 0 2.051 2.051 0 0 1-4.103 0"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.258 10.27c-4.406-7.098-14.11-7.098-18.516 0a3.28 3.28 0 0 0 0 3.459c4.406 7.098 14.11 7.098 18.516 0a3.28 3.28 0 0 0 0-3.458m-17.241.792c3.82-6.154 12.147-6.154 15.966 0a1.78 1.78 0 0 1 0 1.876c-3.82 6.153-12.147 6.153-15.966 0a1.78 1.78 0 0 1 0-1.876"
        fill={color}
      />
    </svg>
  );
}
