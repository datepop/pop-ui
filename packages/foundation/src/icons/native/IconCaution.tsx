import { Circle, Path, Svg } from 'react-native-svg';

import { ColorGray900, SemanticColorBgWhite } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconCaution({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle
        cx="12"
        cy="12"
        r="9"
        fill={isFilled ? color : 'none'}
        stroke={isFilled ? undefined : color}
        strokeWidth={isFilled ? 0 : 1.5}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M12 17.1L12 15.6"
        stroke={isFilled ? SemanticColorBgWhite : color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <Path
        d="M12 14.4V7.2"
        stroke={isFilled ? SemanticColorBgWhite : color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </Svg>
  );
}
