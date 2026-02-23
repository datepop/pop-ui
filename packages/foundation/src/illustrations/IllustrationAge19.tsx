import { IIllustrationProps } from '../types/illustration';

export default function IllustrationAge19({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#clip0_437_2303)">
        <path
          fill="#D92C35"
          d="M21.295 24H2.705A2.704 2.704 0 0 1 0 21.295V2.705A2.705 2.705 0 0 1 2.705 0h18.59A2.706 2.706 0 0 1 24 2.705v18.59A2.705 2.705 0 0 1 21.295 24"
        ></path>
        <path
          fill="#fff"
          d="M13.734 7.142a.37.37 0 0 1 .37-.37h1.9a.37.37 0 0 1 .37.37v2.894a.37.37 0 0 1-.37.37h-1.9a.37.37 0 0 1-.37-.37V7.142M19.64 3.73h-9.197a.37.37 0 0 0-.37.37v8.329a.74.74 0 0 0 .737.74h5.607v3.983h-2.62v-2.165h-3.594V19.9c0 .204.165.37.37.37h9.068a.37.37 0 0 0 .369-.37V4.1a.37.37 0 0 0-.37-.37M5.084 20.269V8.34h-1.32l1.71-4.61h3.312v16.54z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_437_2303">
          <path fill="#fff" d="M0 0h24v24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
