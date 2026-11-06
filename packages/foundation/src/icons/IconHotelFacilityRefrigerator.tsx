import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityRefrigerator({
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
        d="M16.0423 15.6252V4.37516C16.0423 3.45469 15.2961 2.7085 14.3757 2.7085H5.62565C4.70518 2.7085 3.95898 3.45469 3.95898 4.37516V15.6252C3.95898 16.5456 4.70518 17.2918 5.62565 17.2918H14.3757C15.2961 17.2918 16.0423 16.5456 16.0423 15.6252Z"
        stroke={color}
        strokeWidth="1.25"
      />
      <path
        d="M3.95898 8.50146H16.0423"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66602 6.0376L6.66602 5.20426"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M6.66602 12.6914L6.66602 11.4414"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
