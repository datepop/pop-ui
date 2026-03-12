import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationNoCircle({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="9" fill="#FF8A8A" />
      <rect
        x="14.8284"
        y="7.75781"
        width="2"
        height="10"
        rx="1"
        transform="rotate(45 14.8284 7.75781)"
        fill="white"
      />
      <rect
        width="2"
        height="10"
        rx="1"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 9.17139 7.75781)"
        fill="white"
      />
    </svg>
  );
}
