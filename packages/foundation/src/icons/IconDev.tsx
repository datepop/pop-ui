import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconDev({
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
      <rect height="13" rx="2" stroke={color} strokeWidth="1.5" width="18" x="3" y="4" />
      <path
        d="M10 8.5L8.14142 10.3586C8.06332 10.4367 8.06332 10.5633 8.14142 10.6414L10 12.5"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M14 8.5L15.8586 10.3586C15.9367 10.4367 15.9367 10.5633 15.8586 10.6414L14 12.5"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 20.5H15.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
