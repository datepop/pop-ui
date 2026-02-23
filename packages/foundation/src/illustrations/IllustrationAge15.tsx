import { IIllustrationProps } from '../types/illustration';

export default function IllustrationAge15({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#clip0_435_2288)">
        <path
          fill="#DC7317"
          d="M21.295 24H2.705A2.706 2.706 0 0 1 0 21.295V2.705A2.706 2.706 0 0 1 2.705 0h18.59A2.706 2.706 0 0 1 24 2.705v18.59A2.706 2.706 0 0 1 21.295 24"
        ></path>
        <path
          fill="#fff"
          d="M5.182 20.27V8.341H3.86L5.57 3.73h3.313v16.54zM19.576 9.38h-5.801V6.955h6.062V3.73h-9.699v8.81h6.214v4.611h-2.62v-2.165h-3.594v4.913c0 .204.166.37.37.37h9.068a.37.37 0 0 0 .369-.37V9.75a.37.37 0 0 0-.37-.369"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_435_2288">
          <path fill="#fff" d="M0 0h24v24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
