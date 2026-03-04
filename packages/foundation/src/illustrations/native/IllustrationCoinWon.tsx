import { Circle, Path, Svg } from 'react-native-svg';

import type { IIllustrationProps } from '../../types/illustration.native';

export default function IllustrationCoinWon({ size = 24, ...props }: IIllustrationProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx="12" cy="12" r="8.95" fill="#FCC419" stroke="#FFDC72" strokeWidth="2.1" />
      <Path
        d="M8.3406 13.0315H7.11914V12.0275H8.08962L7.24184 8.64758H8.70314L9.38916 12.0275H10.5604L11.2353 8.64758H12.7635L13.4384 12.0275H14.5929L15.2734 8.64758H16.757L15.9148 12.0275H16.8797V13.0315H15.6638L14.816 16.4114H13.2209L12.546 13.0315H11.4417L10.7668 16.4114H9.1828L8.3406 13.0315ZM12.0273 10.4547H11.9604L11.6425 12.0275H12.3452L12.0273 10.4547ZM9.9246 14.6824H10.0306L10.3596 13.0315H9.58995L9.9246 14.6824ZM13.9682 14.6824H14.0575L14.3921 13.0315H13.6392L13.9682 14.6824Z"
        fill="white"
      />
    </Svg>
  );
}
