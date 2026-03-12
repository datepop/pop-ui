import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationPoppass({ size = 24, ...props }: IIllustrationProps) {
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
        d="M7.00146 8.26545L15.2375 4.16829C16.0861 3.74904 17.0955 4.1397 17.4885 5.04489L18.8999 8.26545"
        fill="#98F4F6"
      />
      <path
        d="M7.00146 8.26545L15.2375 4.16829C16.0861 3.74904 17.0955 4.1397 17.4885 5.04489L18.8999 8.26545"
        stroke="#98F4F6"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M19.3749 8.26667H4.62458C3.72721 8.26667 2.99976 9.0768 2.99976 10.0761V18.1905C2.99976 19.1899 3.72721 20 4.62458 20H19.3749C20.2723 20 20.9998 19.1899 20.9998 18.1905V10.0761C20.9998 9.0768 20.2723 8.26667 19.3749 8.26667Z"
        fill="#0FD3D8"
        stroke="#0FD3D8"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M6.17065 11.1709H13.2365"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M6.17065 13.8382H8.82369"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17.7122 10.8762V10.3998"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17.7122 13.2487V12.7723"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17.7122 15.6213V15.1449"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17.7122 17.9938V17.5174"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
