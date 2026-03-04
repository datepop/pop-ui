import { Circle, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconKebap({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx="12" cy="6" r="1.5" fill={color} strokeWidth={0}></Circle>
      <Circle cx="12" cy="12" r="1.5" fill={color} strokeWidth={0}></Circle>
      <Circle cx="12" cy="18" r="1.5" fill={color} strokeWidth={0}></Circle>
    </Svg>
  );
}
