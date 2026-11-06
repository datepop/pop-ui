import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelEvent({
  size = 24,
  color = '#333333',
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
        d="M17.6974 14.4244L9.06019 5.78719C8.52309 5.25009 7.60687 5.48429 7.39339 6.21325L3.81638 18.4275C3.59422 19.1861 4.29852 19.8904 5.05713 19.6682L17.2714 16.0912C18.0003 15.8778 18.2345 14.9615 17.6974 14.4244Z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 4.04308L16 8"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3518 4.30344L13.7566 6.2128"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0681 10.5398L20 10.0221"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.72095 6.86656C8.60677 6.46839 8.19144 6.23817 7.79327 6.35234C7.3951 6.46652 7.16488 6.88185 7.27905 7.28002L8 7.07329L8.72095 6.86656ZM10.3111 17.8539L10.5178 18.5748L11.9597 18.1614L11.753 17.4404L11.032 17.6472L10.3111 17.8539ZM8 7.07329L7.27905 7.28002L10.3111 17.8539L11.032 17.6472L11.753 17.4404L8.72095 6.86656L8 7.07329Z"
        fill={color}
      />
      <path
        d="M6.43067 14.6193C6.3165 14.2211 5.90117 13.9909 5.503 14.1051C5.10483 14.2192 4.87461 14.6346 4.98878 15.0327L5.70973 14.826L6.43067 14.6193ZM6.09133 18.8778L6.29806 19.5987L7.73995 19.1853L7.53322 18.4643L6.81228 18.6711L6.09133 18.8778ZM5.70973 14.826L4.98878 15.0327L6.09133 18.8778L6.81228 18.6711L7.53322 18.4643L6.43067 14.6193L5.70973 14.826Z"
        fill={color}
      />
      <path
        d="M15.1327 16.2119L13.8387 11.3823"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
