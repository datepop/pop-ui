import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconExport({
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
        d="M32.8572 17.2537V31.2558C32.8572 33.329 31.1863 35 29.113 35H10.8871C8.81391 35 7.14294 33.329 7.14294 31.2558V17.2537"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M12.5116 12.4884L20 5L27.5039 12.4884"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 5V25.6395"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
