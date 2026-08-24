import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconSync({
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
        d="M15.7 6L18.7 6L18.7 3"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M8.3 18L5.3 18L5.3 21"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M18.364 5.63604C16.963 4.23511 15.139 3.3356 13.1747 3.077C11.2105 2.8184 9.21578 3.21517 7.5 4.20577C5.78422 5.19638 4.44326 6.72545 3.68508 8.55585C2.92691 10.3862 2.79389 12.4157 3.30667 14.3294"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M5.63593 18.364C7.03686 19.7649 8.8609 20.6644 10.8252 20.923C12.7894 21.1816 14.7841 20.7848 16.4999 19.7942C18.2157 18.8036 19.5566 17.2745 20.3148 15.4442C21.073 13.6138 21.206 11.5843 20.6932 9.67063"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
