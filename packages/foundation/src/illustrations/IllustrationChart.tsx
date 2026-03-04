import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationChart({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3.5" y="13.8889" width="3.77778" height="6.61111" rx="1" fill="#6DE372" />
      <rect x="10.1113" y="3.5" width="3.77778" height="17" rx="1" fill="#30CC37" />
      <rect x="16.7227" y="9.16669" width="3.77778" height="11.3333" rx="1" fill="#6DE372" />
    </svg>
  );
}
