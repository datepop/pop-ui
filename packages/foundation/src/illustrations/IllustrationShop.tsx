import { IIllustrationProps } from '../types/illustration';

export default function IllustrationShop({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 42 42"
      {...props}
    >
      <path
        fill="#E2F6FF"
        d="M7.734 32.067v-14.09a2.6 2.6 0 0 1 2.6-2.6h20.932a2.6 2.6 0 0 1 2.6 2.6v14.09a2.6 2.6 0 0 1-2.6 2.6H10.334a2.6 2.6 0 0 1-2.6-2.6"
      ></path>
      <path
        fill="#6BD1FC"
        d="M7.401 8.262c.16-.775.842-1.33 1.633-1.33h5.082l-.58 8.52a3.748 3.748 0 1 1-7.408-1.01z"
      ></path>
      <path
        fill="#97E0FF"
        d="M14.083 6.932h6.716v8.399a3.614 3.614 0 1 1-7.222-.223zM34.196 8.262a1.67 1.67 0 0 0-1.632-1.33h-5.083l.58 8.52a3.748 3.748 0 1 0 7.41-1.01z"
      ></path>
      <path fill="#6BD1FC" d="M27.515 6.932h-6.716v8.399a3.614 3.614 0 1 0 7.221-.223z"></path>
    </svg>
  );
}
