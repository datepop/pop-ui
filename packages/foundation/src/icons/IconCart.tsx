import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconCart({
  size = 24,
  color = ColorGray900,
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
        d="M2 3H3.38805C4.32891 3 5.14255 3.65578 5.3424 4.57517L7.1576 12.9256C7.35745 13.845 8.17109 14.5008 9.11195 14.5008H18.749C19.7514 14.5008 20.5989 13.7587 20.7314 12.7651L21.5 7.00079"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <circle cx="18" cy="19" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="9.5" cy="19" r="2" stroke={color} strokeWidth="1.5" />
      <path
        d="M11 8L13 10L17 6"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
