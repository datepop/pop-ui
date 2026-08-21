import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconListNumber({
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
      <path d="M7 5H21" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path d="M7 12H21" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path d="M7 19H21" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path
        d="M2.75 3.99988L3.875 2.99219V6.89844"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M2.75 10.0469H4.14661C4.33519 10.0469 4.45588 10.2477 4.36736 10.4142L2.75 13.4569H4.56263"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M2.75 17.1016H4.3125C4.45057 17.1016 4.5625 17.2135 4.5625 17.3516V19.0547M2.75 21.0078H4.3125C4.45057 21.0078 4.5625 20.8959 4.5625 20.7578V19.0547M4.5625 19.0547H3.25"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
