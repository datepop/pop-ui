import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconTicket({
  size = 24,
  color = ColorGray900,
  ...props
}: IIconProps) {
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
        d="M17.7122 10.8763V10.3999"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17.7122 13.2486V12.7722"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17.7122 15.6212V15.1448"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17.7122 17.9937V17.5173"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M19.3749 8.2666H4.62458C3.72721 8.2666 2.99976 9.07673 2.99976 10.0761V18.1905C2.99976 19.1898 3.72721 19.9999 4.62458 19.9999H19.3749C20.2723 19.9999 20.9998 19.1898 20.9998 18.1905V10.0761C20.9998 9.07673 20.2723 8.2666 19.3749 8.2666Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M7.00146 8.26545L15.2375 4.16829C16.0861 3.74904 17.0955 4.1397 17.4885 5.04489L18.8999 8.26545"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M6.17065 11.1709H13.2365"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M6.17065 13.8381H8.82369"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
