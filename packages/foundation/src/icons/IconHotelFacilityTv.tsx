import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityTv({
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
      <rect
        x="3.125"
        y="4.29932"
        width="13.75"
        height="10.4151"
        rx="1.04167"
        stroke={color}
        strokeWidth="1.25"
      />
      <path
        d="M3.125 12.1738L16.875 12.1738"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M6.16992 14.8838L4.50326 16.3838"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M13.9688 14.8838L15.6354 16.3838"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
