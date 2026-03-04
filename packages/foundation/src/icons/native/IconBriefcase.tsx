import { Path, Rect, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconBriefcase({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none" {...props}>
      <Rect
        x="5"
        y="11.2963"
        width="30"
        height="22.037"
        rx="3.33333"
        stroke={color}
        strokeWidth="2.5"
      />
      <Rect x="5" y="25" width="30" height="3.33333" fill={color} strokeWidth={0} />
      <Path
        d="M13.3334 14.4444V7.5C13.3334 6.11929 14.4527 5 15.8334 5H24.1667C25.5474 5 26.6667 6.11929 26.6667 7.5V14.4444"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
