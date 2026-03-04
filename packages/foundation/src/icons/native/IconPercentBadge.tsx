import { Circle, Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconFilledOnlyProps } from '../../types/icon.native';

export default function IconPercentBadge({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'filled',
  ...props
}: IIconFilledOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M11.0025 1.8908a1.5 1.5 0 0 1 1.998 0l1.9358 1.7295a1.5 1.5 0 0 0 .915.3795l2.5913.1455a1.5 1.5 0 0 1 1.4138 1.413l.1455 2.5913a1.5 1.5 0 0 0 .3795.915l1.7288 1.9358a1.5 1.5 0 0 1 0 1.9988l-1.7288 1.935a1.5 1.5 0 0 0-.3795.9158l-.1455 2.5913a1.5 1.5 0 0 1-1.4138 1.4138l-2.5913.1455a1.5 1.5 0 0 0-.915.3788l-1.935 1.7295a1.5 1.5 0 0 1-1.9995 0l-1.935-1.7295a1.5 1.5 0 0 0-.915-.3788l-2.5913-.1455a1.5 1.5 0 0 1-1.4138-1.4138l-.1455-2.5913a1.5 1.5 0 0 0-.3795-.915l-1.7288-1.935a1.5 1.5 0 0 1 0-1.9995l1.7288-1.935a1.5 1.5 0 0 0 .3795-.915l.1455-2.592a1.5 1.5 0 0 1 1.4138-1.413l2.5913-.1455a1.5 1.5 0 0 0 .915-.3795z"
        fill={color}
        strokeWidth={0}
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.55"
        d="m9.2453 14.754 5.5073-5.508"
      />
      <Circle cx="14.7533" cy="14.754" r="1.6718" fill="#fff" />
      <Circle cx="9.2475" cy="9.246" r="1.6718" fill="#fff" />
    </Svg>
  );
}
