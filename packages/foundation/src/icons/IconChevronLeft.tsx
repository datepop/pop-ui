import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconChevronLeft({
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
        d="M27.3661 5.1335C28.2122 5.97964 28.2122 7.35149 27.3661 8.19762L15.5649 19.9989L27.3661 31.8001C28.2122 32.6462 28.2122 34.0181 27.3661 34.8642C26.52 35.7103 25.1481 35.7103 24.302 34.8642L10.9687 21.5309C10.1226 20.6848 10.1226 19.3129 10.9687 18.4668L24.302 5.1335C25.1481 4.28737 26.52 4.28737 27.3661 5.1335Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
