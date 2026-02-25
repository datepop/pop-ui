import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconSound({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

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
        d="M4.30542 23.8888V15.7407C4.30542 13.8998 5.79781 12.4074 7.63876 12.4074H11.2368C11.8336 12.4074 12.4196 12.2471 12.9334 11.9433L20.9033 7.23067C22.5698 6.24524 24.6757 7.44653 24.6757 9.38261V30.2469C24.6757 32.183 22.5698 33.3843 20.9033 32.3989L12.9334 27.6862C12.4196 27.3824 11.8336 27.2222 11.2368 27.2222H7.63875C5.7978 27.2222 4.30542 25.7298 4.30542 23.8888Z"
        stroke={color}
        strokeWidth={isFilled ? 0 : 2.5}
        fill={isFilled ? color : 'none'}
      />
      <path
        d="M30.2315 14.2592C31.4336 17.8654 31.4336 21.7642 30.2315 25.3703"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M33.9352 10.5555C36.3127 16.4994 36.3127 23.1301 33.9352 29.074"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
