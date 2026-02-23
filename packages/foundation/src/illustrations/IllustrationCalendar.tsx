import { IIllustrationProps } from '../types/illustration';

export default function IllustrationCalendar({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="18" height="17" x="3" y="4" fill="#F6F6F6" rx="1.889"></rect>
      <path
        fill="#FA5252"
        d="M3 5.889C3 4.846 3.846 4 4.889 4H19.11C20.154 4 21 4.846 21 5.889V10H3z"
      ></path>
      <path
        stroke="#D8D8D8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 3v3M16.444 3v3"
      ></path>
      <path
        fill="#4A4A4A"
        d="M14.217 19.008c-1.572 0-2.383-.937-2.383-3.504S12.62 12 14.217 12c1.472 0 2.384.803 2.384 3.504 0 2.676-.87 3.504-2.384 3.504m0-1.196c.745 0 1.088-.468 1.088-2.308 0-1.923-.402-2.308-1.088-2.308-.76 0-1.087.518-1.087 2.308 0 1.815.351 2.308 1.087 2.308M9.448 18.883c-.009-.711-.009-3.53-.009-5.361a11 11 0 0 1-.978.602 3.8 3.8 0 0 1-.619-1.062c.61-.376 1.363-.828 1.606-.962a11 11 0 0 1 1.304 0c.025 1.046.034 5.394 0 6.783-.284.05-1.003.05-1.304 0"
      ></path>
    </svg>
  );
}
