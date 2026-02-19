import type { IIllustrationProps } from "../types/illustration";

export default function IllustrationCreditcard({
  size = 24,
  ...props
}: IIllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_creditcard)">
        <rect
          x="0.242554"
          y="15.3738"
          width="26.6667"
          height="16.8421"
          rx="2.10526"
          transform="rotate(-30 0.242554 15.3738)"
          fill="#84CAFF"
          strokeWidth={0}
        />
        <rect
          x="1.94641"
          y="18.3249"
          width="26.6667"
          height="2.80702"
          transform="rotate(-30 1.94641 18.3249)"
          fill="#53B1FD"
          strokeWidth={0}
        />
        <rect
          x="19.317"
          y="26.8494"
          width="10.1623"
          height="2.52202"
          rx="0.664735"
          fill="#FCC419"
          strokeWidth={0}
        />
        <rect
          x="20.8608"
          y="24.3275"
          width="10.1623"
          height="2.52202"
          rx="0.664735"
          fill="#FFDC72"
          strokeWidth={0}
        />
        <rect
          x="19.317"
          y="21.8054"
          width="10.1623"
          height="2.52202"
          rx="0.664735"
          fill="#FCC419"
          strokeWidth={0}
        />
        <circle
          cx="26.586"
          cy="15.4934"
          r="1.45148"
          transform="rotate(-30.34 26.586 15.4934)"
          fill="#FFDC72"
          strokeWidth={0}
        />
        <circle
          cx="24.8549"
          cy="16.5065"
          r="1.45148"
          transform="rotate(-30.34 24.8549 16.5065)"
          fill="#FF922B"
          strokeWidth={0}
        />
      </g>
      <defs>
        <clipPath id="clip0_creditcard">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}