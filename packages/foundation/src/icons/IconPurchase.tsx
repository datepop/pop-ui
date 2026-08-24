import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconPurchase({
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
      <g>
        <path
          d="M4.78101 7.75193C4.90612 6.75107 5.75692 6 6.76556 6H17.2344C18.2431 6 19.0939 6.75107 19.219 7.75193L20.719 19.7519C20.8682 20.9456 19.9374 22 18.7344 22H5.26556C4.06257 22 3.1318 20.9456 3.28101 19.7519L4.78101 7.75193Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M8 8V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V8"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M9 14.5L11.1176 16.5L15 12.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
