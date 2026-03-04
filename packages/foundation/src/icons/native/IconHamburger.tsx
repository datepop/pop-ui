import { Rect, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconHamburger({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect width="18" height="1.5" x="3" y="4" fill={color} rx="0.75" strokeWidth={0}></Rect>
      <Rect width="18" height="1.5" x="3" y="11.5" fill={color} rx="0.75" strokeWidth={0}></Rect>
      <Rect width="18" height="1.5" x="3" y="19" fill={color} rx="0.75" strokeWidth={0}></Rect>
    </Svg>
  );
}
