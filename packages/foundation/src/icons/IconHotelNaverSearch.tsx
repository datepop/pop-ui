import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelNaverSearch({
  size = 20,
  color = '#0FC962',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        d="M6.833,12.667C10.055,12.667 12.667,10.055 12.667,6.833C12.667,3.612 10.055,1 6.833,1C3.612,1 1,3.612 1,6.833C1,10.055 3.612,12.667 6.833,12.667Z"
        stroke={color}
        strokeWidth="2"
      />
      <path fill="none" d="M11,11L16,16" stroke={color} strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
