import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconX({
  size = 24,
  color = ColorGray900,
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.21785 7.21785C8.06399 6.37172 9.43584 6.37172 10.282 7.21785L19.9999 16.9358L29.7178 7.21785C30.564 6.37172 31.9358 6.37172 32.782 7.21785C33.6281 8.06399 33.6281 9.43585 32.782 10.282L23.064 19.9999L32.782 29.7179C33.6281 30.564 33.6281 31.9358 32.782 32.782C31.9358 33.6281 30.564 33.6281 29.7178 32.782L19.9999 23.064L10.282 32.782C9.43584 33.6281 8.06399 33.6281 7.21785 32.782C6.37172 31.9358 6.37172 30.564 7.21785 29.7179L16.9358 19.9999L7.21785 10.282C6.37172 9.43585 6.37172 8.06399 7.21785 7.21785Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
