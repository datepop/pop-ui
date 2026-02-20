import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconMail({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
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
        fill={color}
        d="M16.289 4.586a2.6 2.6 0 0 0-1.61-.554H3.321c-.583 0-1.15.195-1.61.554a.25.25 0 0 0 .03.412l6.884 3.968a.75.75 0 0 0 .75 0l6.884-3.968a.25.25 0 0 0 .03-.412"
      ></path>
      <path
        fill={color}
        d="M16.58 6.252a.225.225 0 0 0-.338-.195l-6.867 3.959a.75.75 0 0 1-.75 0L1.758 6.057a.225.225 0 0 0-.337.195v6.33a2 2 0 0 0 2 2h11.158a2 2 0 0 0 2-2z"
      ></path>
    </svg>
  );
}
