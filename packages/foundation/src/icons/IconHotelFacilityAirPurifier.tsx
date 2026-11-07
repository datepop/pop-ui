import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityAirPurifier({
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
        d="M3.94141 8.12565H8.52178C9.67122 8.12565 10.6035 7.19471 10.6051 6.04528C10.6067 4.89353 9.67353 3.95898 8.52178 3.95898H8.39798"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.26953 10.8789H15.1918C16.5694 10.8789 17.6862 9.76214 17.6862 8.38453V8.18609C17.6862 6.92346 16.6662 5.898 15.4036 5.89125C14.1314 5.88444 13.0965 6.91387 13.0965 8.18609V8.3675"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.15625 13.3333H15.5356C16.3386 13.3333 16.9896 13.9843 16.9896 14.7874C16.9896 15.5882 16.3421 16.2382 15.5413 16.2414L13.346 16.25"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
