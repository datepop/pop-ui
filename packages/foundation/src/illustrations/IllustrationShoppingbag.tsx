import { IIllustrationProps } from '../types/illustration';

export default function IllustrationShoppingbag({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#E5DBFF"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.6"
        d="M8.636 6.436V4.98c0-1.843 1.5-3.343 3.343-3.343 1.844 0 3.343 1.5 3.343 3.343v1.455"
      ></path>
      <path
        fill="#B197FC"
        d="M2.999 20.06c0 1.19.93 2.15 2.08 2.15l13.8-.01c1.15 0 2.08-.96 2.08-2.15l-1.04-12.91c0-1.19-.93-2.15-2.08-2.15H6.119c-1.15 0-2.08.96-2.08 2.15z"
      ></path>
      <rect width="15.83" height="2.893" x="4.063" y="4.989" fill="#9775FA" rx="1.447"></rect>
      <path
        stroke="#E5DBFF"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.6"
        d="M8.28 9.511v-1.61c0-2.04 1.66-3.7 3.7-3.7s3.7 1.66 3.7 3.7v1.61"
      ></path>
    </svg>
  );
}
