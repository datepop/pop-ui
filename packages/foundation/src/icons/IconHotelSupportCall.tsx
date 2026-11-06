import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelSupportCall({
  size = 13.6668,
  color = '#333333',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13.6668 13.6668"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.52116 7.14835C9.18055 9.807 9.78385 6.73124 11.4771 8.4233C13.1095 10.0553 14.0477 10.3822 11.9795 12.4499C11.7204 12.6581 10.0744 15.1629 4.28974 9.37987C-1.49565 3.5961 1.00773 1.94839 1.21598 1.6894C3.28925 -0.384007 3.61058 0.559684 5.243 2.19165C6.93625 3.88443 3.86177 4.4897 6.52116 7.14835Z"
        fill="none"
        fillRule="evenodd"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
