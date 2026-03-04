import { Path, Rect, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconNote({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect
        x="0.65"
        y="2.67539"
        width="21.2859"
        height="20.7513"
        rx="4.01666"
        stroke={color}
        strokeWidth="1.3"
      />
      <Path d="M6 4.65039V0.650391" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <Path d="M19 4.65039V0.650391" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <Path
        d="M5.29297 9.16504C5.29297 9.16504 12.6067 9.16504 17.293 9.16504"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <Path
        d="M5.29297 13.417C5.29297 13.417 12.6067 13.417 17.293 13.417"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <Path
        d="M8.09961 18.0479C8.09961 18.0479 9.80151 18.0479 14.4878 18.0479"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </Svg>
  );
}
