import { Circle, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconMeatBall({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none" {...props}>
      <Circle
        cx="10.8333"
        cy="19.1667"
        r="2.5"
        transform="rotate(-90 10.8333 19.1667)"
        fill={color}
      />
      <Circle
        cx="20.8333"
        cy="19.1666"
        r="2.5"
        transform="rotate(-90 20.8333 19.1666)"
        fill={color}
      />
      <Circle
        cx="30.8333"
        cy="19.1666"
        r="2.5"
        transform="rotate(-90 30.8333 19.1666)"
        fill={color}
      />
    </Svg>
  );
}
