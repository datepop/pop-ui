import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconChevronUp({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3.08 17.42a1.3 1.3 0 0 0 1.84 0L12 10.337l7.08 7.081a1.3 1.3 0 1 0 1.84-1.838l-8-8a1.3 1.3 0 0 0-1.84 0l-8 8a1.3 1.3 0 0 0 0 1.838"
        fill={color}
        strokeWidth={0}
      />
    </Svg>
  );
}
