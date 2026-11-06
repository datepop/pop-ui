import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityStyler({
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
        d="M17.7148 11.8268C17.243 12.4881 15.8657 13.9323 14.4099 12.3451C12.9541 10.7579 11.6903 11.4643 11.0482 12.2862"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M17.7148 14.7438C17.243 15.4051 15.8657 16.8493 14.4099 15.2621C12.9541 13.6749 11.6903 14.3812 11.0482 15.2032"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M7.79871 3.9585L5.99199 3.9585L2.29492 7.38169L3.92607 10.2085L5.41542 9.18462V16.8752H9.79492"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3776 3.9585L14.1662 3.9585L17.7109 7.31741L16.2113 10.2085L14.737 9.18462"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2268 3.9585C12.2268 5.09895 11.2373 6.02347 10.0167 6.02347C8.79613 6.02347 7.80664 5.09895 7.80664 3.9585"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
