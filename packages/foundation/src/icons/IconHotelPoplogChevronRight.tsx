import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelPoplogChevronRight({
  size = 14,
  color = '#B0B0B0',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.004,1.962C3.799,2.167 3.799,2.499 4.004,2.704L8.299,7L4.004,11.295C3.799,11.5 3.799,11.833 4.004,12.038C4.209,12.243 4.541,12.243 4.746,12.038L9.413,7.371C9.618,7.166 9.618,6.833 9.413,6.628L4.746,1.962C4.541,1.757 4.209,1.757 4.004,1.962Z"
        fill={color}
      />
    </svg>
  );
}
