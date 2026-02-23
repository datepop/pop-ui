import { IIllustrationProps } from '../types/illustration';

export default function IllustrationAgeAll({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#clip0_437_2312)">
      <path
        fill="#00964B"
        d="M21.295 24H2.706A2.706 2.706 0 0 1 0 21.294V2.706A2.706 2.706 0 0 1 2.706 0h18.589A2.705 2.705 0 0 1 24 2.706v18.588A2.705 2.705 0 0 1 21.295 24"
      ></path>
      <path
        fill="#fff"
        d="m6.958 18.154-.291-1.84-2.13.001-.291 1.838-2.744.001v-.033L4.1 5.824h3.002L9.7 18.122l.001.032zM5.6 9.794l-.678 4.196h1.356zm4.583 8.36V5.824h2.744v9.86h3.228v2.47zm6.553 0V5.823h2.744l-.001 9.862h3.23v2.47z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_437_2312">
        <path fill="#fff" d="M0 0h24v24H0z"></path>
      </clipPath>
    </defs>
    </svg>
  );
}
