import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconHome({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M33.6119 15.0537V32.1261C33.6119 33.9718 32.1163 35.4674 30.2706 35.4674H9.74559C7.89992 35.4674 6.4043 33.9718 6.4043 32.1261V15.0537"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
      />
      <path
        d="M3.33328 17.3767L17.5894 5.42761C18.9737 4.23429 21.0262 4.23429 22.4104 5.42761L36.6666 17.3926"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2985 35.4674V27.8143C15.2985 25.9686 16.7941 24.473 18.6398 24.473H21.3924C23.238 24.473 24.7337 25.9686 24.7337 27.8143V35.4674"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
