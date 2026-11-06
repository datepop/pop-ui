import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelCheck({
  size = 12,
  color = '#1F1F1F',
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
        d="M1.5011 6L4.67757 9L10.5011 3"
        fill="none"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
