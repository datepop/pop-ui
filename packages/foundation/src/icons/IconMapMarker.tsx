import { ColorGray900, SemanticColorBgWhite } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconMapMarker({
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
        d="M19.9781 10.3112C19.4734 15.4712 15.772 19.7512 13.5953 21.8612C12.712 22.7212 11.2609 22.7212 10.3777 21.8612C8.0327 19.5912 3.9844 14.7712 3.9844 9.1312C3.9844 4.8012 7.7804 1.3112 12.3755 1.5012C17.0759 1.7012 20.4092 5.8512 19.9781 10.3012V10.3112Z"
        stroke={color}
        strokeWidth={isFilled ? 0 : 1.5}
        strokeMiterlimit="10"
        fill={isFilled ? color : undefined}
      />
      <path
        d="M12.1471 12.1612C13.7764 12.1612 15.0971 10.8404 15.0971 9.2112C15.0971 7.582 13.7764 6.2612 12.1471 6.2612C10.5179 6.2612 9.1972 7.582 9.1972 9.2112C9.1972 10.8404 10.5179 12.1612 12.1471 12.1612Z"
        stroke={color}
        strokeWidth={isFilled ? 0 : 1.5}
        fill={isFilled ? SemanticColorBgWhite : undefined}
        strokeMiterlimit="10"
      />
    </svg>
  );
}
