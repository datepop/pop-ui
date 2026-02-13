import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconBrowse({
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
        d="M14.8584 5.83331H9.15835C7.3174 5.83331 5.82501 7.3257 5.82501 9.16665V15.0166C5.82501 16.8576 7.3174 18.35 9.15835 18.35H14.8584C16.6993 18.35 18.1917 16.8576 18.1917 15.0166V9.16665C18.1917 7.3257 16.6993 5.83331 14.8584 5.83331Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 2.5}
      />
      <path
        d="M30.8417 5.83331H25.1417C23.3007 5.83331 21.8083 7.3257 21.8083 9.16665V15.0166C21.8083 16.8576 23.3007 18.35 25.1417 18.35H30.8417C32.6826 18.35 34.175 16.8576 34.175 15.0166V9.16665C34.175 7.3257 32.6826 5.83331 30.8417 5.83331Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 2.5}
      />
      <path
        d="M14.8584 21.65H9.15841C7.31746 21.65 5.82507 23.1423 5.82507 24.9833V30.8333C5.82507 32.6742 7.31746 34.1666 9.15841 34.1666H14.8584C16.6994 34.1666 18.1918 32.6742 18.1918 30.8333V24.9833C18.1918 23.1423 16.6994 21.65 14.8584 21.65Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 2.5}
      />
      <path
        d="M30.7752 21.65H25.0752C23.2342 21.65 21.7418 23.1423 21.7418 24.9833V30.8333C21.7418 32.6742 23.2342 34.1666 25.0752 34.1666H30.7752C32.6161 34.1666 34.1085 32.6742 34.1085 30.8333V24.9833C34.1085 23.1423 32.6161 21.65 30.7752 21.65Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 2.5}
      />
    </svg>
  );
}
