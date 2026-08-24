import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconVisibilityOff({
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
      <g>
        <path
          d="M21.7715 10.3287C21.7715 10.3287 20.986 9.50499 19 8.50006M2.2292 10.3287C2.2292 10.3287 6.78907 6.52881 12.0003 6.52881C12.7804 6.52881 13.5458 6.61395 14.2836 6.75874"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M21.7715 14.6713C21.7715 14.6713 17.2116 18.4712 12.0003 18.4712C11.1435 18.4712 10.3043 18.3685 9.5 18.1968M2.2292 14.6713C2.2292 14.6713 2.95284 15.2743 4.15302 15.9999"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.74396 12.5C8.74396 10.7011 10.2022 9.24292 12.001 9.24292M12.001 15.757C13.7998 15.757 15.2581 14.2988 15.2581 12.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M19.9995 4L3.99951 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
