import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconPlus({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
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
        d="M12 1.683c.683 0 1.236.554 1.236 1.237v7.843h7.844a1.237 1.237 0 0 1 0 2.473h-7.843v7.844a1.237 1.237 0 0 1-2.474 0v-7.843H2.92a1.237 1.237 0 1 1 0-2.474h7.843V2.92c0-.683.554-1.237 1.237-1.237"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
