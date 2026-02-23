import { IIllustrationProps } from '../types/illustration';

export default function IllustrationAge12({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#clip0_437_2294)">
        <path
          fill="#EABC00"
          d="M21.294 24H2.706A2.705 2.705 0 0 1 0 21.295V2.705A2.706 2.706 0 0 1 2.706 0h18.588A2.707 2.707 0 0 1 24 2.706v18.59A2.706 2.706 0 0 1 21.294 24"
        ></path>
        <path
          fill="#fff"
          d="M5.192 20.269V8.341h-1.32l1.71-4.61h3.312v16.538zM19.565 3.731h-9.047a.37.37 0 0 0-.369.369v4.999h3.616V6.847h2.555v1.991l-6.301 8.985v2.426h9.873v-3.227H14.61l4.61-6.472q.217-.304.347-.531t.216-.444q.086-.216.119-.476.032-.26.032-.628V4.1a.37.37 0 0 0-.37-.37"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_437_2294">
          <path fill="#fff" d="M0 0h24v24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
