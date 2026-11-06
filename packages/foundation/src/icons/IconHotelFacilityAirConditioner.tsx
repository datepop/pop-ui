import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityAirConditioner({
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
        x="2.29102"
        y="4.27588"
        width="15.4167"
        height="7.38912"
        rx="1.66667"
        stroke={color}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M6.06706 16.3486L5.98502 16.1517C5.80607 15.7223 6.03809 15.2323 6.48372 15.0986C6.92936 14.9649 7.16138 14.475 6.98243 14.0455L6.90039 13.8486"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M12.7331 16.3486L12.651 16.1517C12.4721 15.7223 12.7041 15.2323 13.1497 15.0986C13.5954 14.9649 13.8274 14.475 13.6484 14.0455L13.5664 13.8486"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M9.40104 16.3486L9.319 16.1517C9.14006 15.7223 9.37207 15.2323 9.81771 15.0986C10.2633 14.9649 10.4954 14.475 10.3164 14.0455L10.2344 13.8486"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M2.5 9.07812H17.5"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 6.4165H5.83333"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
