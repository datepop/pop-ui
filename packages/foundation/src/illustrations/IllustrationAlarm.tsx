import { IIllustrationProps } from '../types/illustration';

export default function IllustrationAlarm({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="#2E90FA"
        d="M2.586 5.397a2.5 2.5 0 1 1 4.33-2.5l.417.722-4.33 2.5zM17.414 5.397a2.5 2.5 0 0 0-4.33-2.5l-.417.722 4.33 2.5z"
      ></path>
      <path
        stroke="#2E90FA"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.25"
        d="M10 2.75v-1"
      ></path>
      <path
        fill="#D8F0FF"
        stroke="#84CAFF"
        strokeMiterlimit="10"
        strokeWidth="1.25"
        d="M10 18.25a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
      ></path>
      <path
        stroke="#2E90FA"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.25"
        d="m10.1 10.75 2.9-3M8 9l2.102 2"
      ></path>
    </svg>
  );
}
