import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconCards({ size = 24, color = ColorGray900, ...props }: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.2347 4.99817L8.63448 3.70812C8.90694 2.82889 9.84057 2.33701 10.7198 2.60948L17.0877 4.58283C17.9669 4.8553 18.4588 5.78892 18.1863 6.66815L15.8238 14.2918C15.5514 15.171 14.6178 15.6629 13.7385 15.3904L12.1466 14.8971"
        stroke={color}
        strokeWidth="1.25"
      />
      <rect
        width="10"
        height="11.6667"
        rx="1.66667"
        transform="matrix(-1 1.03044e-07 1.03044e-07 1 12.3867 5.35742)"
        stroke={color}
        strokeWidth="1.25"
      />
    </svg>
  );
}
