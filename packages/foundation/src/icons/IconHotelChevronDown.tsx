import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelChevronDown({
  size = 14,
  color = '#CDCDCD',
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
        d="M1.79719 4.42211C2.09334 4.12596 2.57348 4.12596 2.86963 4.42211L7.00006 8.55256L11.1305 4.42211C11.4266 4.12596 11.9068 4.12596 12.2029 4.42211C12.4991 4.71826 12.4991 5.19841 12.2029 5.49456L7.53628 10.1612C7.24013 10.4574 6.75999 10.4574 6.46384 10.1612L1.79719 5.49456C1.50104 5.19841 1.50104 4.71826 1.79719 4.42211Z"
        fill={color}
      />
    </svg>
  );
}
