import { Circle, Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconFilter({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M3 8H13.0654M21 8H18.9634" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M21 16H10.9357M3 16H5.0377" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Circle cx="16" cy="8" r="2.75" stroke={color} strokeWidth="1.5" />
      <Circle cx="8" cy="16" r="2.75" stroke={color} strokeWidth="1.5" />
    </Svg>
  );
}
