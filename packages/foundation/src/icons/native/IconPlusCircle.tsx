import { Circle, Path, Svg } from 'react-native-svg';

import { ColorGray900, SemanticColorBgWhite } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconPlusCircle({
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
        r="10.9091"
        fill={isFilled ? color : 'none'}
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        strokeLinecap="round"
        d="M12 6.5455V17.4545M17.4545 12H6.5455"
        stroke={isFilled ? SemanticColorBgWhite : color}
        strokeWidth="1.5"
      />
    </Svg>
  );
}
