import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelInformation({
  size = 14,
  color = '#07A3C6',
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
        d="M7,1.75A5.25,5.25 0,1 0,7 12.25A5.25,5.25 0,1 0,7 1.75"
        fill="none"
        stroke={color}
        strokeWidth="0.875"
        strokeLinecap="round"
      />
      <path
        d="M7,6.42L7,9.33"
        fill="none"
        stroke={color}
        strokeWidth="0.875"
        strokeLinecap="round"
      />
      <path d="M7,4.67m-0.58,0a0.58,0.58 0,1 0,1.16 0a0.58,0.58 0,1 0,-1.16 0" fill={color} />
    </svg>
  );
}
