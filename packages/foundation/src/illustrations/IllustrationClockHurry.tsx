import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationClockHurry({ size = 24, ...props }: IIllustrationProps) {
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
        d="M14.1885 21.0001C19.159 21.0001 23.1885 16.9707 23.1885 12.0001C23.1885 7.02954 19.159 3.00011 14.1885 3.00011C9.21791 3.00011 5.18848 7.02954 5.18848 12.0001C5.18848 16.9707 9.21791 21.0001 14.1885 21.0001Z"
        fill="#84CAFF"
      />
      <path
        d="M14.1885 12.8619V7.91194"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17.1885 16L14.1885 12.8573"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <rect
        width="7.08719"
        height="2"
        rx="1"
        transform="matrix(1 0 0 -1 3.2981 14.7125)"
        fill="white"
      />
      <rect
        width="8.15479"
        height="2"
        rx="1"
        transform="matrix(1 0 0 -1 0.811768 11.2875)"
        fill="white"
      />
    </svg>
  );
}
