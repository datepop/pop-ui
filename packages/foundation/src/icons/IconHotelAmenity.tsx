import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelAmenity({
  size = 24,
  color = '#333333',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5,3H8.41A2,2 0,0 1,10.41 5V8.41A2,2 0,0 1,8.41 10.41H5A2,2 0,0 1,3 8.41V5A2,2 0,0 1,5 3Z M15.5898,3H18.9998A2,2 0,0 1,20.9998 5V8.41A2,2 0,0 1,18.9998 10.41H15.5898A2,2 0,0 1,13.5898 8.41V5A2,2 0,0 1,15.5898 3Z M5,13.5999H8.41A2,2 0,0 1,10.41 15.5999V19.0099A2,2 0,0 1,8.41 21.0099H5A2,2 0,0 1,3 19.0099V15.5999A2,2 0,0 1,5 13.5999Z M15.5898,13.5999H18.9998A2,2 0,0 1,20.9998 15.5999V19.0099A2,2 0,0 1,18.9998 21.0099H15.5898A2,2 0,0 1,13.5898 19.0099V15.5999A2,2 0,0 1,15.5898 13.5999Z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
