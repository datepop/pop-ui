import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelAmenitySmall({
  size = 20,
  color = '#333333',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="rotate(90 18.3333 4.16667)">
        <path
          d="M19.99997,4.16667H28.33333A1.66667,1.66667 0 0,1 30,5.83334V19.1667A1.66667,1.66667 0 0,1 28.33333,20.83337H19.99997A1.66667,1.66667 0 0,1 18.3333,19.1667V5.83334A1.66667,1.66667 0 0,1 19.99997,4.16667Z"
          fill="none"
          stroke={color}
          strokeWidth="1.25"
        />
      </g>
      <path d="M1.66667 7.5H18.3333" fill="none" stroke={color} strokeWidth="1.25" />
      <path
        d="M4.58333 10.4167H7.91667"
        fill="none"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
