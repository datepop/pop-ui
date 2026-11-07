import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelPerson({
  size = 16,
  color = '#4A4A4A',
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
        strokeWidth="1"
        d="M8.003,7.19C9.52,7.19 10.75,5.96 10.75,4.443C10.75,2.926 9.52,1.697 8.003,1.697C6.486,1.697 5.257,2.926 5.257,4.443C5.257,5.96 6.486,7.19 8.003,7.19Z"
        fill="none"
        stroke={color}
      />
      <path
        strokeWidth="1"
        d="M6.59,8.99L9.417,8.99C11.403,8.99 13.01,10.603 13.01,12.583L13.01,13.05C13.01,13.743 12.45,14.303 11.757,14.303L4.243,14.303C3.55,14.303 2.99,13.743 2.99,13.05L2.99,12.583C2.99,10.597 4.603,8.99 6.583,8.99L6.59,8.99Z"
        fill="none"
        stroke={color}
      />
    </svg>
  );
}
