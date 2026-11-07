import type { IIconProps } from '../types/icon';

export default function IconHotelFooterFavorite({
  size = 18,
  color = '#0fd3d8',
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size * 0.9444444444444444}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.26,14.661L8.942,15l-0.328,-0.328c-0.871,-0.87 -1.868,-1.652 -2.831,-2.41C3.324,10.33 1,8.507 1,5.509 1,2.938 2.869,1 5.347,1c2.01,0 3.032,1.083 3.62,2.178C9.571,2.028 10.583,1 12.577,1 14.779,1 17,2.51 17,5.88c0,2.303 -2.137,4.017 -4.4,5.831 -1.143,0.917 -2.325,1.864 -3.34,2.95z"
        strokeWidth="2"
        fill={color}
        fillOpacity={variant === 'filled' ? 1 : 0.063}
        fillRule="evenodd"
        stroke={color}
      />
    </svg>
  );
}
