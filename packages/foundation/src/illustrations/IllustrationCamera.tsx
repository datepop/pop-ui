import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationCamera({ size = 24, ...props }: IIllustrationProps) {
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
        d="M18 20H6C4.34315 20 3 18.6569 3 17V9.60466C3 7.9478 4.34315 6.60466 6 6.60466H7.16107C7.36573 6.60466 7.54973 6.47994 7.62552 6.28983L8.03638 5.25932C8.33956 4.4989 9.07554 4.00001 9.89417 4.00001H14.1058C14.9245 4.00001 15.6604 4.4989 15.9636 5.25932L16.3745 6.28983C16.4503 6.47994 16.6343 6.60466 16.8389 6.60466H18C19.6569 6.60466 21 7.9478 21 9.60466V17C21 18.6569 19.6569 20 18 20Z"
        fill="#DA77F2"
      />
      <circle cx="12" cy="13" r="3" stroke="white" strokeWidth="1.5" />
      <ellipse cx="16.5211" cy="9.54492" rx="0.753488" ry="0.739322" fill="white" />
    </svg>
  );
}
