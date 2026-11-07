import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityWashingMachine({
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
        d="M16.875 15.1668V4.75016C16.875 3.82969 16.1288 3.0835 15.2083 3.0835H4.79167C3.87119 3.0835 3.125 3.82969 3.125 4.75016V15.1668C3.125 16.0873 3.87119 16.8335 4.79167 16.8335H15.2083C16.1288 16.8335 16.875 16.0873 16.875 15.1668Z"
        stroke={color}
        strokeWidth="1.25"
      />
      <path
        d="M3.33398 5.62109L16.6673 5.62109"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="11.2705" r="3.75" stroke={color} strokeWidth="1.25" />
      <path
        d="M6.25 11.5772C6.25 11.5772 7.14638 10.5088 8.50564 10.5088C9.8649 10.5088 10.52 12.1755 11.7646 12.1755C13.0092 12.1755 13.75 11.5772 13.75 11.5772"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
