import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconEditNote({
  size = 24,
  color = ColorGray900,
  variant = 'line',
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
        d="M14.45 10.2201L13.03 10.6901C12.79 10.7701 12.56 10.5401 12.64 10.3001L13.11 8.8801C13.13 8.8101 13.18 8.7401 13.23 8.6801L19.16 2.7501C19.36 2.5501 19.67 2.5501 19.87 2.7501L20.58 3.4601C20.78 3.6601 20.78 3.9701 20.58 4.1701L14.65 10.1001C14.6 10.1501 14.53 10.2001 14.45 10.2201Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M19.27 10.3501V19.4001C19.27 20.5001 18.37 21.4001 17.27 21.4001H5.27002C4.17002 21.4001 3.27002 20.5001 3.27002 19.4001V5.40015C3.27002 4.30015 4.17002 3.40015 5.27002 3.40015H13.54"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M6.27002 15.9062H14.27"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M6.27002 18.4001H9.27002"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
