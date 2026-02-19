import { IIllustrationProps } from '../types/illustration';

export default function IllustrationCalendar({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <rect width="24" height="22.667" x="4" y="5.333" fill="#F6F6F6" rx="2.519"></rect>
      <path
        fill="#FA5252"
        d="M4 7.852a2.52 2.52 0 0 1 2.519-2.519h18.963A2.52 2.52 0 0 1 28 7.852v5.481H4z"
      ></path>
      <path
        stroke="#D8D8D8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.333 4v4M21.926 4v4"
      ></path>
      <path
        fill="#4A4A4A"
        d="M18.957 25.344c-2.097 0-3.178-1.249-3.178-4.672S16.827 16 18.957 16c1.962 0 3.177 1.07 3.177 4.672 0 3.568-1.16 4.672-3.177 4.672m0-1.594c.992 0 1.45-.625 1.45-3.078 0-2.565-.536-3.078-1.45-3.078-1.015 0-1.45.692-1.45 3.078 0 2.42.468 3.078 1.45 3.078M12.597 25.177c-.011-.948-.011-4.706-.011-7.148-.357.257-.792.513-1.305.803-.29-.323-.68-.992-.825-1.416a79 79 0 0 1 2.14-1.282c.29-.034 1.395-.034 1.74 0 .034 1.394.045 7.192 0 9.043-.379.067-1.338.067-1.74 0"
      ></path>
    </svg>
  );
}
