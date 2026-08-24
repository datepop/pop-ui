import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconBookmark({
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
            d="M5 19.6925V5.25C5 4.14543 5.89543 3.25 7 3.25H17C18.1046 3.25 19 4.14543 19 5.25V19.6925C19 20.527 18.0383 20.9944 17.3822 20.4789L12 16.25L6.61782 20.4789C5.96169 20.9944 5 20.527 5 19.6925Z"
            fill={color}
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.5"
          />{' '}
        </>
      ) : (
        <>
          <path
            d="M5 19.6925V5.25C5 4.14543 5.89543 3.25 7 3.25H17C18.1046 3.25 19 4.14543 19 5.25V19.6925C19 20.527 18.0383 20.9944 17.3822 20.4789L12 16.25L6.61782 20.4789C5.96169 20.9944 5 20.527 5 19.6925Z"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.5"
          />{' '}
        </>
      )}
    </svg>
  );
}
