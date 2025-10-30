import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

interface IconStarProps extends IconProps {
  border?: string;
  filled?: boolean;
}

export default function IconStar({
  size = 24,
  color = ColorGray900,
  border = ColorGray900,
  filled = false,
  ...props
}: IconStarProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.73617 2.78471L9.95445 5.21854C10.0738 5.45748 10.3043 5.62316 10.5716 5.6615L13.2969 6.05378C13.9702 6.151 14.2382 6.96707 13.7509 7.43467L11.7801 9.32833C11.5864 9.51455 11.4983 9.78224 11.5441 10.0451L12.0092 12.7186C12.1237 13.3799 11.4198 13.8845 10.818 13.5716L8.38214 12.3085C8.14335 12.1846 7.85735 12.1846 7.61786 12.3085L5.182 13.5716C4.58015 13.8845 3.87626 13.3799 3.9915 12.7186L4.4559 10.0451C4.50171 9.78224 4.41355 9.51455 4.21988 9.32833L2.24912 7.43467C1.76181 6.96707 2.02976 6.151 2.70311 6.05378L5.42843 5.6615C5.69569 5.62316 5.92685 5.45748 6.04625 5.21854L7.26383 2.78471C7.5651 2.18293 8.4349 2.18293 8.73617 2.78471Z"
        stroke={!filled ? border : color}
        fill={filled ? color : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
