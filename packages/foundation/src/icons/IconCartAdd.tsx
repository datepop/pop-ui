import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconCartAdd({
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
        d="M1 4H2.4914C3.38436 4 4.16913 4.59195 4.41445 5.45056L6.58555 13.0494C6.83087 13.908 7.61564 14.5 8.5086 14.5H18C19.1046 14.5 20 13.6046 20 12.5V7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12.6 4.8V10.8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.6 7.8H15.6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="19" r="2.25" stroke={color} strokeWidth="1.5" />
      <circle cx="7.5" cy="19" r="2.25" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
