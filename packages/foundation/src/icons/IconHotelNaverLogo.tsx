import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelNaverLogo({
  size = 18,
  color = '#03C75A',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M12.2,9.64L5.53,0H0V18H5.8V8.37L12.47,18H18V0H12.2V9.64Z"
      />
    </svg>
  );
}
