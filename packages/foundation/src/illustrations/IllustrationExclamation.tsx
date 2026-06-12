import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationExclamation({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect x="10" y="18.1013" width="4" height="4" rx="1" fill="#FA5252" />
      <path
        fill="#FA5252"
        d="M9.07652 3.1726C9.03517 2.59373 9.49363 2.10135 10.074 2.10135H13.926C14.5064 2.10135 14.9648 2.59373 14.9235 3.1726L14.0663 15.1726C14.029 15.6959 13.5935 16.1013 13.0689 16.1013H10.9311C10.4065 16.1013 9.97104 15.6959 9.93366 15.1726L9.07652 3.1726Z"
      />
    </svg>
  );
}
