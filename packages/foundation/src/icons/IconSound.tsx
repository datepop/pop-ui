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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {isFilled ? (
        <g transform="scale(0.6)">
          <path
            d="M4.30542 23.8888V15.7407C4.30542 13.8998 5.79781 12.4074 7.63876 12.4074H11.2368C11.8336 12.4074 12.4196 12.2471 12.9334 11.9433L20.9033 7.23067C22.5698 6.24524 24.6757 7.44653 24.6757 9.38261V30.2469C24.6757 32.183 22.5698 33.3843 20.9033 32.3989L12.9334 27.6862C12.4196 27.3824 11.8336 27.2222 11.2368 27.2222H7.63875C5.7978 27.2222 4.30542 25.7298 4.30542 23.8888Z"
            stroke={color}
            strokeWidth="0"
            fill={color}
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
        </g>
      ) : (
        <>
          <path
            d="M3 14.5V9.5C3 8.39543 3.89543 7.5 5 7.5H7.05863C7.42599 7.5 7.78624 7.39882 8.09988 7.20757L12.7191 4.39087C13.7186 3.78136 15 4.50081 15 5.67155V18.3284C15 19.4992 13.7186 20.2186 12.7191 19.6091L8.09988 16.7924C7.78624 16.6012 7.42599 16.5 7.05863 16.5H5C3.89543 16.5 3 15.6046 3 14.5Z"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M17.75 8.55554C18.4712 10.7192 18.4712 13.0585 17.75 15.2222"
            stroke={color}
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M20.25 6.33337C21.6765 9.89971 21.6765 13.8781 20.25 17.4445"
            stroke={color}
            strokeLinecap="round"
            strokeWidth="1.5"
          />{' '}
        </>
      )}
    </svg>
  );
}
