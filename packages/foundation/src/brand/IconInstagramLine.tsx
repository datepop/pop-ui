import type { IBrandIconProps } from '../types/brand';

export default function IconInstagramLine({ size = 24, ...props }: IBrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect
        x="2.9"
        y="2.9"
        width="18.2"
        height="18.2"
        rx="4.6"
        stroke="url(#instagram_line_gradient)"
        strokeWidth="1.8"
      />
      <path
        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
        stroke="url(#instagram_line_gradient)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="6.5" r="1" fill="url(#instagram_line_gradient)" />
      <defs>
        <radialGradient
          id="instagram_line_gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(4.8 22.8) rotate(-55.4) scale(24.6)"
        >
          <stop stopColor="#FDF497" />
          <stop offset="0.05" stopColor="#FDF497" />
          <stop offset="0.45" stopColor="#FD5949" />
          <stop offset="0.6" stopColor="#D6249F" />
          <stop offset="0.9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
    </svg>
  );
}
