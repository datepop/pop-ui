import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconPhoneCall({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.458 18.2c-.026 1.006-.232 2.452-1.045 3.58l-.084.117-.136.013c-.2.025-.451.051-.748.051-1.574 0-4.387-.587-7.323-4.02-3.038-3.838-3.484-7.057-2.903-8.8l.045-.135.13-.058c1.322-.6 3.186-.67 4.038-.529l.148.026.078.136c.69 1.167.987 2.96.716 4.264l-.02.103-.077.071c-.322.29-1.058.768-1.548 1.02.148.542.58 1.245 1.284 2.103.703.852 1.316 1.406 1.819 1.664.342-.425.948-1.064 1.297-1.322l.084-.065h.103c1.342-.013 3.039.626 4.052 1.523l.116.103-.026.155z"
        fill={color}
        fillRule="nonzero"
      />
      <circle stroke={color} strokeWidth="1.5" cx="12.568" cy="11.284" r="8" />
      <path stroke={color} strokeWidth="1.5" d="M12.568 8.284v4h4" />
    </svg>
  );
}
