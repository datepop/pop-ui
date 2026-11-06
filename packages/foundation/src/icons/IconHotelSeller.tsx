import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelSeller({
  size = 16,
  color = '#333333',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.6667 4.66667C10.6667 6.13943 9.47276 7.33333 8 7.33333C6.52724 7.33333 5.33333 6.13943 5.33333 4.66667C5.33333 3.19391 6.52724 2 8 2C9.47276 2 10.6667 3.19391 10.6667 4.66667Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeMiterlimit="10"
      />
      <path
        d="M4 14H12C12.7364 14 13.3333 13.403 13.3333 12.6667V12.6667C13.3333 10.4575 11.5425 8.66667 9.33333 8.66667H6.66667C4.45753 8.66667 2.66667 10.4575 2.66667 12.6667V12.6667C2.66667 13.403 3.26362 14 4 14Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
