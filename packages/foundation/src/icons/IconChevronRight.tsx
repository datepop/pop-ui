import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconChevronRight({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.9687 5.1335C10.1225 5.97964 10.1225 7.35149 10.9687 8.19762L22.7699 19.9989L10.9687 31.8001C10.1225 32.6462 10.1225 34.0181 10.9687 34.8642C11.8148 35.7103 13.1867 35.7103 14.0328 34.8642L27.3661 21.5309C28.2122 20.6848 28.2122 19.3129 27.3661 18.4668L14.0328 5.1335C13.1867 4.28737 11.8148 4.28737 10.9687 5.1335Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
