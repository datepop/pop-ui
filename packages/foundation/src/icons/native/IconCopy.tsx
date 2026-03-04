import { Path, Rect, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconCopy({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16 6.9999V4.9999C16 3.8954 15.1046 2.9999 14 2.9999H6C4.8954 2.9999 4 3.8954 4 4.9999V15.9999C4 17.1045 4.8954 17.9999 6 17.9999H8"
        stroke={color}
        strokeWidth="1.5"
      />
      <Rect x="8" y="7" width="12" height="14" rx="2" stroke={color} strokeWidth="1.5" />
    </Svg>
  );
}
