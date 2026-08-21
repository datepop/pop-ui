import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconPopcorn({
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
        d="M4.19407 11.1644C4.09248 10.5549 4.56252 10 5.18046 10H18.8195C19.4375 10 19.9075 10.5549 19.8059 11.1644L18.2785 20.3288C18.1178 21.2932 17.2834 22 16.3057 22H7.69425C6.71658 22 5.8822 21.2932 5.72147 20.3288L4.19407 11.1644Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9 10L10 22"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M15 10L14 22"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10 2C11.2712 2 12.3551 2.79177 12.792 3.9082C13.1278 3.65296 13.5457 3.5 14 3.5C14.8314 3.5 15.544 4.00751 15.8457 4.72949C16.201 4.58131 16.591 4.5 17 4.5C18.6569 4.5 20 5.84315 20 7.5C20 8.54398 19.4662 9.46265 18.6572 10H5.34277C4.53378 9.46265 4 8.54398 4 7.5C4 5.84315 5.34315 4.5 7 4.5C7.0137 4.5 7.02736 4.50079 7.04102 4.50098C7.27863 3.08162 8.51314 2 10 2Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M11.0785 6.59474C10.9188 6.34053 10.6648 6.14613 10.3561 6.04168C10.0473 5.93723 9.70097 5.92857 9.37076 6.01704C9.04056 6.10552 8.74495 6.28619 8.52978 6.53103C8.31461 6.77587 8.19191 7.07119 8.18069 7.3712"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
