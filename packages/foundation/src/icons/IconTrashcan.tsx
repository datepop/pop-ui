import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconTrashcan({
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
        d="M5 5.5H19V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5.5Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9 3.5C9 2.94772 9.44772 2.5 10 2.5H14C14.5523 2.5 15 2.94772 15 3.5V5.5H9V3.5Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9.5 9.5V17"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M14.5 9.5V17"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M3 5.5H21"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
