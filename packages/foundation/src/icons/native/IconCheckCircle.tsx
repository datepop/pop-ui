import { Circle, Path, Svg } from 'react-native-svg';

import { ColorGray900, SemanticColorBgWhite } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconCheckCircle({
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
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M8.24878 12L11.2488 15L16.5 9.5"
        stroke={isFilled ? SemanticColorBgWhite : color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
