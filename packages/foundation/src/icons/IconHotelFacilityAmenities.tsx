import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityAmenities({
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
        d="M14.4193 4.75016V3.50016C14.4193 3.27004 14.2327 3.0835 14.0026 3.0835H11.5026C11.2725 3.0835 11.0859 3.27004 11.0859 3.50016V4.75016"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M13.1187 16.9089H14.3516C15.272 16.9089 16.0182 16.1627 16.0182 15.2422V6.90885C16.0182 5.98838 15.272 5.24219 14.3516 5.24219H11.0182C10.0978 5.24219 9.35156 5.98838 9.35156 6.90885V7.68506"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M9.35286 8.00928V5.92594C9.35286 5.69583 9.16632 5.50928 8.9362 5.50928H6.4362C6.20608 5.50928 6.01953 5.69583 6.01953 5.92594V8.00928"
        stroke={color}
        strokeWidth="1.25"
      />
      <path
        d="M7.68555 4.87321V3.20654"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35221 3.0835H6.6478L5.18555 3.45611"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.93555 11.0755C3.93555 9.23457 5.42793 7.74219 7.26888 7.74219H8.10221C9.94316 7.74219 11.4355 9.23457 11.4355 11.0755V15.2422C11.4355 16.1627 10.6894 16.9089 9.76888 16.9089H5.60221C4.68174 16.9089 3.93555 16.1627 3.93555 15.2422V11.0755Z"
        stroke={color}
        strokeWidth="1.25"
      />
    </svg>
  );
}
