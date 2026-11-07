import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelCancellation({
  size = 16,
  color = '#07A3C6',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8,1.5A6.5,6.5 0,1 0,8 14.5A6.5,6.5 0,1 0,8 1.5"
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      <path d="M12,4L4,12" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
