import type { IIllustrationProps } from "../types/illustration";

export default function IllustrationClapperboard({
  size = 24,
  ...props
}: IIllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_clapperboard)">
        <path
          d="M21.3201 19.3889C21.3201 20.55 20.38 21.5 19.231 21.5H5.65174C4.50273 21.5 3.56262 20.55 3.56262 19.3889V12.5278C3.56262 11.3667 4.50273 10.4167 5.65174 10.4167H19.231C20.38 10.4167 21.3201 11.3667 21.3201 12.5278V19.3889Z"
          fill="url(#paint0_clapperboard)"
          strokeWidth={0}
        />
        <path
          d="M3.56262 11.25C3.56262 10.7898 3.93572 10.4167 4.39596 10.4167H20.4868C20.947 10.4167 21.3201 10.7898 21.3201 11.25V14.1111H3.56262V11.25Z"
          fill="white"
          strokeWidth={0}
        />
        <mask
          id="mask0_clapperboard"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="3"
          y="10"
          width="19"
          height="5"
        >
          <path
            d="M3.56262 11.25C3.56262 10.7898 3.93572 10.4167 4.39596 10.4167H20.4868C20.947 10.4167 21.3201 10.7898 21.3201 11.25V14.1111H3.56262V11.25Z"
            fill="#DFE2F6"
          />
        </mask>
        <g mask="url(#mask0_clapperboard)">
          <path
            d="M3.56262 10.4167H5.65174L3.56262 14.1111V10.4167ZM9.3077 10.4167L7.21858 14.1111H10.8745L12.9637 10.4167H9.3077ZM16.6196 10.4167L14.5305 14.1111H18.1865L20.2756 10.4167H16.6196Z"
            fill="url(#paint1_clapperboard)"
            strokeWidth={0}
          />
        </g>
        <path
          d="M2.87818 7.63671C2.76853 7.19136 3.03938 6.74112 3.48419 6.62931L19.0994 2.70414C19.5473 2.59156 20.0013 2.86467 20.1117 3.31309L20.5959 5.27943C20.7056 5.72478 20.4347 6.17503 19.9899 6.28686L4.37474 10.2125C3.92684 10.3251 3.4728 10.052 3.36239 9.60352L2.87818 7.63671Z"
          fill="white"
          strokeWidth={0}
        />
        <mask
          id="mask1_clapperboard"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="2"
          y="2"
          width="19"
          height="9"
        >
          <path
            d="M2.87818 7.63671C2.76853 7.19136 3.03938 6.74112 3.48419 6.62931L19.0994 2.70414C19.5473 2.59156 20.0013 2.86467 20.1117 3.31309L20.5959 5.27943C20.7056 5.72478 20.4347 6.17503 19.9899 6.28686L4.37474 10.2125C3.92684 10.3251 3.4728 10.052 3.36239 9.60352L2.87818 7.63671Z"
            fill="#DFE2F6"
          />
        </mask>
        <g mask="url(#mask1_clapperboard)">
          <path
            d="M2.67993 6.83145L5.59008 9.90681L3.56258 10.4166L2.67993 6.83145ZM12.6858 8.12345L9.77563 5.04756L6.22778 5.93951L9.13792 9.01539L12.6858 8.12345ZM19.7815 6.33956L16.8713 3.26367L13.3235 4.15562L16.2336 7.23098L19.7815 6.33956Z"
            fill="url(#paint2_clapperboard)"
            strokeWidth={0}
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_clapperboard"
          x1="5.32921"
          y1="10.4167"
          x2="8.72999"
          y2="24.1753"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0192308" stopColor="#FF9E9E" />
          <stop offset="1" stopColor="#C09AFF" />
        </linearGradient>
        <linearGradient
          id="paint1_clapperboard"
          x1="5.2253"
          y1="10.4167"
          x2="5.64807"
          y2="15.2461"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0192308" stopColor="#FF9E9E" />
          <stop offset="1" stopColor="#C09AFF" />
        </linearGradient>
        <linearGradient
          id="paint2_clapperboard"
          x1="4.38126"
          y1="3.26367"
          x2="5.90026"
          y2="12.4341"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0192308" stopColor="#FF9E9E" />
          <stop offset="1" stopColor="#C09AFF" />
        </linearGradient>
        <clipPath id="clip0_clapperboard">
          <rect
            width="18.8021"
            height="19"
            fill="white"
            transform="translate(2.599 2.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}