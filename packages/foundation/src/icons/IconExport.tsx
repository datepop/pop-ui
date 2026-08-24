import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconExport({
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
        d="M21.5 15V19C21.5 20.1046 20.6046 21 19.5 21H4.5C3.39543 21 2.5 20.1046 2.5 19V15"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path d="M12 16L12 3" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path
        d="M16 7L12 3L8 7"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
