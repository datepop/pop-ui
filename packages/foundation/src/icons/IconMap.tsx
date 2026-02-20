import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconMap({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.9685 3.33001L7.01602 2.25001C6.87352 2.21251 6.73102 2.19751 6.58102 2.19751C6.46852 2.19751 6.35602 2.22001 6.24352 2.25001L2.72602 3.21001C2.24602 3.33751 1.91602 3.77251 1.91602 4.26751V14.895C1.91602 15.375 2.37352 15.7275 2.83852 15.6L6.25102 14.67C6.50602 14.6025 6.76852 14.6025 7.02352 14.67L10.976 15.75C11.231 15.8175 11.4935 15.8175 11.7485 15.75L15.2735 14.79C15.7535 14.6625 16.0835 14.2275 16.0835 13.7325V3.09751C16.0835 2.61751 15.626 2.26501 15.161 2.39251L11.7485 3.32251C11.4935 3.39001 11.231 3.39001 10.976 3.32251L10.9685 3.33001Z"
        stroke={color}
        strokeWidth="1.35"
        strokeMiterlimit="10"
      />
      <path d="M6.58887 14.625V2.19751" stroke={color} strokeWidth="1.35" strokeMiterlimit="10" />
      <path d="M11.3438 15.8025V3.375" stroke={color} strokeWidth="1.35" strokeMiterlimit="10" />
    </svg>
  );
}
