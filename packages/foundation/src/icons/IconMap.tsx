import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconMap({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.6247 4.44L9.3547 3C9.1647 2.95 8.9747 2.93 8.7747 2.93C8.6247 2.93 8.4747 2.96 8.3247 3L3.6347 4.28C2.9947 4.45 2.5547 5.03 2.5547 5.69V19.86C2.5547 20.5 3.1647 20.97 3.7847 20.8L8.3347 19.56C8.6747 19.47 9.0247 19.47 9.3647 19.56L14.6347 21C14.9747 21.09 15.3247 21.09 15.6647 21L20.3647 19.72C21.0047 19.55 21.4447 18.97 21.4447 18.31V4.13C21.4447 3.49 20.8347 3.02 20.2147 3.19L15.6647 4.43C15.3247 4.52 14.9747 4.52 14.6347 4.43L14.6247 4.44Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path d="M8.7852 19.5V2.93" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M15.1251 21.07V4.5" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" />
    </svg>
  );
}
