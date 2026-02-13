import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconPhoneCall({
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
        d="M22.4984 31.9169C30.3233 31.9169 36.6667 25.5735 36.6667 17.7486C36.6667 9.92359 30.3233 3.5802 22.4984 3.5802C14.6734 3.5802 8.33002 9.92359 8.33002 17.7486C8.33002 25.5735 14.6734 31.9169 22.4984 31.9169Z"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
      />
      <path
        d="M22.6781 17.7486V9.96985"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M29.0678 17.7487H22.6781"
        stroke={color}
        strokeWidth="2.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M26.453 31.2143L22.4002 28.714C21.959 28.4199 21.4034 28.3872 20.8968 28.6323L18.9848 29.5311C12.4971 27.6355 10.6178 22.5531 10.0948 21.0497L11.108 18.8599C11.3532 18.3696 11.3205 17.7977 11.0427 17.3564L8.54238 13.3037C8.21554 12.7644 7.57821 12.4702 6.95722 12.6173C6.48331 12.7154 5.91134 12.9442 5.35572 13.369C4.53863 14.0064 3.77056 15.1013 3.37836 17.046C3.28031 17.5362 3.34568 18.0265 3.54178 18.5004C5.11059 22.1609 7.1043 26.2791 10.34 29.5148C13.5103 32.6851 17.514 34.6461 21.1256 36.1986C21.5668 36.3947 22.0897 36.4764 22.58 36.3783C24.541 36.0025 25.6686 35.2344 26.3223 34.401C26.7798 33.8617 27.0086 33.2897 27.1067 32.7831C27.2538 32.1458 26.9759 31.5248 26.4367 31.1816L26.453 31.2143Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
