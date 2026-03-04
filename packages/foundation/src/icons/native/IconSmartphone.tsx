import { Path, Rect, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconSmartphone({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 26" fill="none" {...props}>
      <Rect
        x="5.15039"
        y="1.50391"
        width="13.6986"
        height="22.9916"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path d="M9.79688 4.54102H14.2482" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}
