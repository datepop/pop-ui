import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelBed({
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
        d="M13.5 11.9028V7.56942C13.5 6.83304 12.903 6.23608 12.1667 6.23608H3.83333C3.09695 6.23608 2.5 6.83304 2.5 7.56942V11.9028H13.5Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      <path
        d="M12.1667 6.23201V4.50041C12.1667 3.76403 11.5697 3.16707 10.8333 3.16707H5.16667C4.43029 3.16707 3.83333 3.76403 3.83333 4.50041V6.23201H12.1667Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      <path
        d="M2.93359 10H13.2669"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 13.5234V11.5234"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M13.5 13.5025V11.5025"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
