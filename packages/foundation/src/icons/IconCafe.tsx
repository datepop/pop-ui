import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconCafe({
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
      <path
        d="M4.97571 8.302C4.97571 7.74972 5.42342 7.302 5.97571 7.302H17.6778V14.9456C17.6778 17.1547 15.8869 18.9456 13.6778 18.9456H8.97571C6.76657 18.9456 4.97571 17.1547 4.97571 14.9456V8.302Z"
        stroke={color}
        strokeWidth="1.5"
        fill={isFilled ? color : 'none'}
      />
      <path d="M2.47339 21.6716H21.5265" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M17.6779 7.302H18.7364C19.9056 7.302 20.8534 8.24982 20.8534 9.41902V9.41902C20.8534 10.5882 19.9056 11.536 18.7364 11.536H17.6779V7.302Z"
        stroke={color}
        strokeWidth="1.5"
        fill={isFilled ? color : 'none'}
      />
      <path
        d="M10.0074 5.1514L9.83087 4.58816C9.65076 4.01348 9.94381 3.39707 10.5032 3.17397C11.0626 2.95086 11.3556 2.33445 11.1755 1.75978L10.999 1.19653"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.2871 5.1514L13.1105 4.58816C12.9304 4.01348 13.2235 3.39707 13.7829 3.17397C14.3423 2.95086 14.6353 2.33445 14.4552 1.75978L14.2787 1.19653"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
