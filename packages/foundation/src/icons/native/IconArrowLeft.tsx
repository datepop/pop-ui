import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconArrowLeft({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9.1667 6.5L3.5 12.5L9.1667 18.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M3.5 12.5005L20.5 12.5005" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}
