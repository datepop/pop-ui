import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconUp({
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
        d="M20.0084 17.975C23.8007 17.975 26.875 14.9007 26.875 11.1084C26.875 7.31601 23.8007 4.2417 20.0084 4.2417C16.216 4.2417 13.1417 7.31601 13.1417 11.1084C13.1417 14.9007 16.216 17.975 20.0084 17.975Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 2.5}
      />
      <path
        d="M16.475 22.475H23.5416C28.5083 22.475 32.525 26.5083 32.525 31.4583V32.625C32.525 34.3583 31.125 35.7583 29.3917 35.7583H10.6083C8.87498 35.7583 7.47498 34.3583 7.47498 32.625V31.4583C7.47498 26.4916 11.5083 22.475 16.4583 22.475H16.475Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 2.5}
      />
    </svg>
  );
}
