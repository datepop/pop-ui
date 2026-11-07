import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityNoSmoking({
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
        d="M15.5508 8.29932L15.5508 11.6326"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="9.99856"
        strokeLinecap="round"
      />
      <path
        d="M5.31251 11.8096H2.28711V8.05957H8.95378"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0462 11.8096H17.7129V8.0623H14.5165"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5078 3.3335L3.24956 16.5917"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
