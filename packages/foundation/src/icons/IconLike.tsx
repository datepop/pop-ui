import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconLike({
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
        d="M3 11C3 10.4477 3.44772 10 4 10H8V21H4C3.44772 21 3 20.5523 3 20V11Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12.0805 3.87918L8 10V21H16.6217C18.0751 21 19.3194 19.9582 19.575 18.5275L20.5799 12.9017C20.7989 11.6758 19.8564 10.55 18.6111 10.55H14.0667L15.6097 5.55734C16.0022 4.28722 15.0527 3 13.7233 3C13.0632 3 12.4467 3.32992 12.0805 3.87918Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
