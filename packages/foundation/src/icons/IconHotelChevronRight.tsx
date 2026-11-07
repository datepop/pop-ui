import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelChevronRight({
  size = 12,
  color = '#666666',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.49988 9.50024L7.99988 6.00024L4.49988 2.50024"
        fill="none"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
