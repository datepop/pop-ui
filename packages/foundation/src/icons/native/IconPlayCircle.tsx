import { Circle, Path, Svg } from 'react-native-svg';

import { ColorGray900, SemanticColorBgWhite } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconPlayCircle({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
      <Circle
        cx="12"
        cy="12"
        r="11.25"
        fill={isFilled ? color : 'none'}
        stroke={color}
        opacity={isFilled ? 0.6 : 1}
        strokeWidth="1.5"
      />
      <Path
        fill={isFilled ? SemanticColorBgWhite : color}
        d="M16.368 11.5035c.3218.2528.3218.7403 0 .9938l-5.346 4.2a.6315.6315 0 0 1-1.0223-.4965V7.8a.6315.6315 0 0 1 1.0223-.4973z"
      />
    </Svg>
  );
}
