import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityBreakfast({
  size = 20,
  color = '#333333',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.5 7.33333C3.5 6.8731 3.8731 6.5 4.33333 6.5H14.2681V12.75C14.2681 15.0512 12.4026 16.9167 10.1014 16.9167H7.66667C5.36548 16.9167 3.5 15.0512 3.5 12.75V7.33333Z"
        stroke={color}
        strokeWidth="1.25"
      />
      <path
        d="M14.2676 6.5H14.7676C16.1483 6.5 17.2676 7.61929 17.2676 9V9C17.2676 10.3807 16.1483 11.5 14.7676 11.5H14.2676V6.5Z"
        stroke={color}
        strokeWidth="1.25"
      />
      <path
        d="M7.08268 4.75L7.00064 4.5531C6.8217 4.12363 7.05372 3.63369 7.49935 3.5C7.94498 3.36631 8.177 2.87637 7.99806 2.4469L7.91602 2.25"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M10.4167 4.75L10.3346 4.5531C10.1557 4.12363 10.3877 3.63369 10.8333 3.5C11.279 3.36631 11.511 2.87637 11.332 2.4469L11.25 2.25"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
