import { Circle, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconDragMenu({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none" {...props}>
      <Circle cx="15.8334" cy="9.16663" r="2.5" fill={color} strokeWidth={0} />
      <Circle cx="24.1667" cy="9.16663" r="2.5" fill={color} strokeWidth={0} />
      <Circle cx="15.8334" cy="19.1666" r="2.5" fill={color} strokeWidth={0} />
      <Circle cx="24.1667" cy="19.1666" r="2.5" fill={color} strokeWidth={0} />
      <Circle cx="15.8334" cy="29.1666" r="2.5" fill={color} strokeWidth={0} />
      <Circle cx="24.1667" cy="29.1666" r="2.5" fill={color} strokeWidth={0} />
    </Svg>
  );
}
