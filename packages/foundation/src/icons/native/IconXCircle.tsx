import { Circle, Rect, Svg } from 'react-native-svg';

import { ColorGray900, SemanticColorBgWhite } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconXCircle({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
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
      <Rect
        x="14.8284"
        y="7.75781"
        width="2"
        height="10"
        rx="1"
        transform="rotate(45 14.8284 7.75781)"
        fill={isFilled ? SemanticColorBgWhite : color}
        strokeWidth={0}
      />
      <Rect
        width="2"
        height="10"
        rx="1"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 9.17139 7.75781)"
        fill={isFilled ? SemanticColorBgWhite : color}
        strokeWidth={0}
      />
    </Svg>
  );
}
