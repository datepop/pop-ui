import { IIllustrationProps } from '../types/illustration';

export default function IllustrationShoppingbag({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        stroke="#D0BFFF"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2.133"
        d="M11.515 8.581v-1.94c0-2.457 2-4.457 4.458-4.457 2.457 0 4.457 2 4.457 4.458v1.94"
      ></path>
      <path
        fill="#B197FC"
        d="M3.999 26.745c0 1.587 1.24 2.867 2.773 2.867l18.4-.013c1.533 0 2.773-1.28 2.773-2.867L26.56 9.52c0-1.587-1.24-2.867-2.774-2.867H8.16c-1.534 0-2.774 1.28-2.774 2.867z"
      ></path>
      <rect width="21.106" height="3.858" x="5.417" y="6.652" fill="#9775FA" rx="1.929"></rect>
      <path
        stroke="#D0BFFF"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2.133"
        d="M11.04 12.682v-2.147a4.94 4.94 0 0 1 4.933-4.933 4.94 4.94 0 0 1 4.933 4.933v2.147"
      ></path>
    </svg>
  );
}
