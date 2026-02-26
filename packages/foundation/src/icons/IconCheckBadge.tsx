import { ColorGray900 } from '../tokens/colors';

import type { IIconFilledOnlyProps } from '../types/icon';

export default function IconCheckBadge({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'filled',
  ...props
}: IIconFilledOnlyProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={color}
        d="M14.2728 1.764a.6.6 0 0 1 .8784.2352l1.0176 2.106a.6.6 0 0 0 .5844.3372l2.334-.1716a.6.6 0 0 1 .642.6432l-.1716 2.3328a.6.6 0 0 0 .3372.5844l2.1072 1.0188a.6.6 0 0 1 .2352.8772l-1.3152 1.9356a.6.6 0 0 0 0 .6744l1.3152 1.9344a.6.6 0 0 1-.2352.8784l-2.1072 1.0176a.6.6 0 0 0-.3372.5844l.1716 2.334a.6.6 0 0 1-.642.642l-2.334-.1716a.6.6 0 0 0-.5844.3372l-1.0176 2.1072a.6.6 0 0 1-.8784.2352l-1.9344-1.3152a.6.6 0 0 0-.6756 0L9.7284 22.236a.6.6 0 0 1-.8784-.2352l-1.0176-2.1072a.6.6 0 0 0-.5844-.336l-2.334.1704a.6.6 0 0 1-.642-.642l.1716-2.334a.6.6 0 0 0-.3372-.5844l-2.1072-1.0176a.6.6 0 0 1-.2352-.8784l1.3164-1.9344a.6.6 0 0 0 0-.6744L1.764 9.7272a.6.6 0 0 1 .2352-.8772l2.1072-1.0188a.6.6 0 0 0 .3372-.5844L4.272 4.914a.6.6 0 0 1 .642-.6432l2.334.1716a.6.6 0 0 0 .5844-.336l1.0176-2.1072a.6.6 0 0 1 .8784-.2352l1.9344 1.3152a.6.6 0 0 0 .6756 0z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m8.2488 11.9988 3 3 5.2512-5.4996"
      ></path>
    </svg>
  );
}
