import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconMetaBall({
  size = 24,
  color = ColorGray900,
  variant = 'line',
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
      <circle
        cx="10.8333"
        cy="19.1667"
        r="2.5"
        transform="rotate(-90 10.8333 19.1667)"
        fill={color}
      />
      <circle
        cx="20.8333"
        cy="19.1666"
        r="2.5"
        transform="rotate(-90 20.8333 19.1666)"
        fill={color}
      />
      <circle
        cx="30.8333"
        cy="19.1666"
        r="2.5"
        transform="rotate(-90 30.8333 19.1666)"
        fill={color}
      />
    </svg>
  );
}
