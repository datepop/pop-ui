import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconReset({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3 17.3487C4.6677 20.1293 7.7847 21.9999 11.3548 21.9999C16.6817 21.9999 21 17.8352 21 12.6975C21 7.56 16.6817 3.3952 11.3548 3.3952C7.7847 3.3952 4.6677 5.2659 3 8.0464M3 8.0464V2M3 8.0464H8.4612"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
