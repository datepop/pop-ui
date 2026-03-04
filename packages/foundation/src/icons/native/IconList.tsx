import { Path, Rect, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconList({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M7.84924 11.627H16.1508"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M7.84924 14.7368H16.1508"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M7.84924 17.8569H12.0949"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Rect
        x="3.96826"
        y="2.29883"
        width="16.0635"
        height="19.4025"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <Rect
        x="6.58997"
        y="4.93408"
        width="10.8199"
        height="3.46565"
        rx="0.5"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
}
