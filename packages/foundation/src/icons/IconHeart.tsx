import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconHeart({
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
        <>
          <path
            d="M16.5567 3.01074C20.8578 3.00026 22.4549 6.5022 21.8907 9.91016C21.1774 14.2095 15.2125 19.4999 12 21C8.78753 19.5 2.82259 14.2096 2.10926 9.91016C1.54514 6.50219 3.14216 3.00026 7.44331 3.01074L7.45405 3C9.5 3.00014 10.9247 4.3428 12 5.62207C13.0753 4.34275 14.4999 3.00003 16.546 3L16.5567 3.01074Z"
            fill={color}
            stroke={color}
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />{' '}
        </>
      ) : (
        <>
          <path
            d="M16.5567 3.01074C20.8578 3.00026 22.4549 6.5022 21.8907 9.91016C21.1774 14.2095 15.2125 19.4999 12 21C8.78753 19.5 2.82259 14.2096 2.10926 9.91016C1.54514 6.50219 3.14216 3.00026 7.44331 3.01074L7.45405 3C9.5 3.00014 10.9247 4.3428 12 5.62207C13.0753 4.34275 14.4999 3.00003 16.546 3L16.5567 3.01074Z"
            stroke={color}
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />{' '}
        </>
      )}
    </svg>
  );
}
