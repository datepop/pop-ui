import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconLogout({
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
        d="M12.36364 4H6.63636C6.20237 4 5.78616 4.21071 5.47928 4.58579C5.1724 4.96086 5 5.46957 5 6V18C5 18.5304 5.1724 19.0391 5.47928 19.4142C5.78616 19.7893 6.20237 20 6.63636 20H12.36364"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12H19M15.7273 15L19 12L15.7273 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
