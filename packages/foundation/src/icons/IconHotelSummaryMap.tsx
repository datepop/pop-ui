import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelSummaryMap({
  size = 31,
  color = '#000',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size * 0.967741935483871}
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.463,0.769C7.588,0.769 1.18,7.156 1.18,15.006c0,7.85 6.407,14.238 14.282,14.238 7.874,0 14.28,-6.388 14.28,-14.238S23.339,0.77 15.464,0.77z"
        strokeWidth=".75"
        fill="none"
        stroke={color}
        fillRule="evenodd"
      />
      <path
        d="M18.025,21.569L23.144,19.912 23.144,8.444 18.025,10.1 12.9,8.444 7.781,10.1 7.781,21.569 12.9,19.912zM12.9,8.444L12.9,19.912M18.025,10.1L18.025,21.569"
        strokeWidth=".75"
        fill="none"
        stroke={color}
        fillRule="evenodd"
      />
    </svg>
  );
}
