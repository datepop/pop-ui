import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconHeart({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

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
        d="M16.4296 3.7451C14.6996 3.7451 13.1696 5.0251 12.1595 6.2451C12.0796 6.3451 11.9495 6.3451 11.8595 6.2451C10.8496 5.0251 9.2195 3.7551 7.5896 3.7451C3.4496 3.7151 1.9696 7.0951 2.5796 10.3351C3.3596 14.4851 9.8896 19.3751 11.5996 20.1651C11.8696 20.2851 12.1595 20.2851 12.4295 20.1651C14.1395 19.3751 20.7796 14.4351 21.4496 10.3351C21.9796 7.0851 20.4796 3.7451 16.4396 3.7551L16.4296 3.7451Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 1.5}
      />
    </svg>
  );
}
