import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityLuggage({
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
      <path
        d="M6.66602 7.25016V4.3335C6.66602 3.64314 7.22566 3.0835 7.91602 3.0835H12.0827C12.773 3.0835 13.3327 3.64314 13.3327 4.3335V7.25016"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <rect
        x="3.125"
        y="5.625"
        width="13.75"
        height="11.25"
        rx="1.66667"
        stroke={color}
        strokeWidth="1.25"
      />
      <path
        d="M3.125 13.6606H16.875"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
