import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationHome({ size = 24, ...props }: IIllustrationProps) {
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
        d="M19.3503 8.78754V18.1647C19.3503 19.1785 18.5427 20 17.546 20H6.4625C5.46584 20 4.6582 19.1785 4.6582 18.1647V8.78754"
        fill="#B2DDFF"
      />
      <path
        d="M3 10.0635L10.6983 3.49158C11.4458 2.83614 12.5542 2.83614 13.3017 3.49158L21 10.0635"
        fill="#B2DDFF"
      />
      <path
        d="M3 10.0635L10.6983 3.49158C11.4458 2.83614 12.5542 2.83614 13.3017 3.49158L21 10.0635"
        stroke="#53B1FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.46094 19.9913V15.7877C9.46094 14.7739 10.2686 13.9525 11.2652 13.9525H12.7516C13.7483 13.9525 14.5559 14.7739 14.5559 15.7877V19.9913"
        fill="#E8F5FF"
      />
    </svg>
  );
}
