import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconText({
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
        d="M19.286 7.482h-1.519l-.364-2.41q-.087-.44-.426-.439h-3.678v14.22q0 .189.126.364.138.175.414.201l1.644.1v1.105H8.517v-1.105l1.645-.1q.276-.026.401-.201a.58.58 0 0 0 .138-.364V4.633H6.999q-.377 0-.44.439l-.351 2.41H4.714V3.378h14.572z"
        fill={color}
      />
    </svg>
  );
}
