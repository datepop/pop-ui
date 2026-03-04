import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconChevronLeft({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16.42 3.08a1.3 1.3 0 0 1 0 1.839l-7.081 7.08 7.08 7.081a1.3 1.3 0 1 1-1.838 1.839l-8-8a1.3 1.3 0 0 1 0-1.839l8-8a1.3 1.3 0 0 1 1.839 0"
        fill={color}
        strokeWidth={0}
      />
    </Svg>
  );
}
