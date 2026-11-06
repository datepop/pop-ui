import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFooterCheck({
  size = 15,
  color = '#0fd3d8',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.917,9.2a0.496,0.496 0,0 1,-0.353 -0.145L5.147,7.632a0.5,0.5 0,0 1,0 -0.71,0.495 0.495,0 0,1 0.7,0l1.07,1.075 2.838,-2.852a0.495,0.495 0,0 1,0.7 0,0.501 0.501,0 0,1 0,0.704l-3.19,3.196a0.496,0.496 0,0 1,-0.348 0.155z"
        fill={color}
        fillRule="nonzero"
      />
      <path
        d="M7.5,7.5m-6.5,0a6.5,6.5 0,1 1,13 0a6.5,6.5 0,1 1,-13 0"
        strokeWidth=".9"
        fill="none"
        stroke={color}
        fillRule="evenodd"
      />
    </svg>
  );
}
