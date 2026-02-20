import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconCreditcard({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
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
        d="M17.0515 4.62158H2.94809C2.09008 4.62158 1.39453 5.36427 1.39453 6.28043V13.7193C1.39453 14.6355 2.09008 15.3782 2.94809 15.3782H17.0515C17.9095 15.3782 18.6051 14.6355 18.6051 13.7193V6.28043C18.6051 5.36427 17.9095 4.62158 17.0515 4.62158Z"
        stroke={color}
        strokeWidth="1.2"
        strokeMiterlimit="10"
      />
      <path
        d="M2.4082 7.84863L17.3757 7.84863"
        stroke={color}
        strokeWidth="1.66667"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M3.5459 11.0754L7.84854 11.0754"
        stroke={color}
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
