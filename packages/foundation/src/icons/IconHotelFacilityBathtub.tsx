import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityBathtub({
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
        d="M8.17383 5.64648L10.5231 4.79143"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 8.97168H16.25C16.5952 8.97168 16.875 9.2515 16.875 9.59668V11.6797C16.875 13.6357 15.289 15.2217 13.333 15.2217H6.66699C4.71098 15.2217 3.125 13.6357 3.125 11.6797V9.59668C3.125 9.2515 3.40482 8.97168 3.75 8.97168Z"
        stroke={color}
        strokeWidth="1.25"
      />
      <path
        d="M5.04297 8.88391V5.13411C5.04297 3.98352 5.97571 3.05078 7.1263 3.05078H7.33648C8.371 3.05078 9.20964 3.88942 9.20964 4.92393"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.30957V10.1429C7.5 10.8333 8.05964 11.3929 8.75 11.3929H11.25C11.9404 11.3929 12.5 10.8333 12.5 10.1429V9.4286"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.75391 15.1475L4.50391 16.3975"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M14.252 15.1572L15.502 16.4072"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
