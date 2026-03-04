import { Path, Rect, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconCalendar({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect x="3" y="5.77771" width="18" height="16" rx="2" stroke={color} strokeWidth="1.5" />
      <Path
        d="M7 3.77771V5.77771"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 3.77771V5.77771"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x="3" y="10" width="18" height="1.5" fill={isFilled ? undefined : color} />
      <Rect
        x="3.70044"
        y="6.26282"
        width="16.8291"
        height="4.51416"
        stroke={isFilled ? color : undefined}
        fill={isFilled ? color : undefined}
      />
    </Svg>
  );
}
