import { IIllustrationProps } from '../types/illustration';

export default function IllustrationMegaphone({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#FF922B"
        d="M1.5 9.5A1.5 1.5 0 0 1 3 8h2.5v8H3a1.5 1.5 0 0 1-1.5-1.5zM19.5 9H21a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 21 15h-1.5z"
      ></path>
      <path
        fill="#FCC419"
        d="m5.5 8 11.91-5.104a1.5 1.5 0 0 1 2.09 1.379v15.45a1.5 1.5 0 0 1-2.09 1.379L5.5 16z"
      ></path>
    </svg>
  );
}
