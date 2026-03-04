import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconText({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M19.286 7.482h-1.519l-.364-2.41q-.087-.44-.426-.439h-3.678v14.22q0 .189.126.364.138.175.414.201l1.644.1v1.105H8.517v-1.105l1.645-.1q.276-.026.401-.201a.58.58 0 0 0 .138-.364V4.633H6.999q-.377 0-.44.439l-.351 2.41H4.714V3.378h14.572z"
        fill={color}
      />
    </Svg>
  );
}
