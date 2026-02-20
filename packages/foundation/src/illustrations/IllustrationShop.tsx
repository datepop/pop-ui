import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationShop({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g transform="scale(0.75)">
        <path
          fill="#E2F6FF"
          d="M2.734 27.067v-14.09a2.6 2.6 0 0 1 2.6-2.6h20.932a2.6 2.6 0 0 1 2.6 2.6v14.09a2.6 2.6 0 0 1-2.6 2.6H5.334a2.6 2.6 0 0 1-2.6-2.6"
          strokeWidth={0}
        />
        <path
          fill="#6BD1FC"
          d="M2.402 3.262c.16-.775.842-1.33 1.632-1.33h5.083l-.58 8.52a3.747 3.747 0 1 1-7.409-1.01z"
          strokeWidth={0}
        />
        <path
          fill="#97E0FF"
          d="M9.084 1.932h6.717v8.399a3.614 3.614 0 1 1-7.222-.223zM29.198 3.262a1.67 1.67 0 0 0-1.632-1.33h-5.083l.58 8.52a3.748 3.748 0 1 0 7.409-1.01z"
          strokeWidth={0}
        />
        <path
          fill="#6BD1FC"
          d="M22.515 1.932h-6.716v8.399a3.614 3.614 0 1 0 7.221-.223z"
          strokeWidth={0}
        />
      </g>
    </svg>
  );
}
