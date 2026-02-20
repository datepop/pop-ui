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
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27.3826 6.24179C24.4993 6.24179 21.9493 8.37512 20.2659 10.4085C20.1326 10.5751 19.9159 10.5751 19.7659 10.4085C18.0826 8.37512 15.3659 6.25845 12.6493 6.24179C5.74927 6.19179 3.2826 11.8251 4.29927 17.2251C5.59927 24.1418 16.4826 32.2918 19.3326 33.6085C19.7826 33.8085 20.2659 33.8085 20.7159 33.6085C23.5659 32.2918 34.6326 24.0585 35.7493 17.2251C36.6326 11.8085 34.1326 6.24179 27.3993 6.25845L27.3826 6.24179Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 2.5}
      />
    </svg>
  );
}
