import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconMinus({ size = 24, color = ColorGray900, ...props }: IIconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.08 10.763a1.237 1.237 0 0 1 0 2.473H2.92a1.237 1.237 0 1 1 0-2.473z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
