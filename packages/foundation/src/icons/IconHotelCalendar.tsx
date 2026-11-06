import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelCalendar({
  size = 16,
  color = '#333333',
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
        d="M3.593,3.593L12.407,3.593A1.259,1.259 0,0 1,13.667 4.852L13.667,12.407A1.259,1.259 0,0 1,12.407 13.667L3.593,13.667A1.259,1.259 0,0 1,2.333 12.407L2.333,4.852A1.259,1.259 0,0 1,3.593 3.593z"
        fill="none"
        stroke={color}
      />
      <path
        strokeWidth="1"
        d="M4.852,2.333L4.852,4.333"
        strokeLinejoin="round"
        fill="none"
        stroke={color}
        strokeLinecap="round"
      />
      <path
        strokeWidth="1"
        d="M11.148,2.333L11.148,4.333"
        strokeLinejoin="round"
        fill="none"
        stroke={color}
        strokeLinecap="round"
      />
      <path d="M2.667,6.667h10.667v1h-10.667z" fill={color} />
    </svg>
  );
}
