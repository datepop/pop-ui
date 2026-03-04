import { Circle, ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

import type { IIllustrationProps } from '../../types/illustration.native';

export default function IllustrationCreditcard({ size = 24, ...props }: IIllustrationProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_32_2248)">
        <Rect
          width="20"
          height="12.632"
          x="0.182"
          y="11.53"
          fill="#84CAFF"
          rx="1.579"
          transform="rotate(-30 .182 11.53)"
        ></Rect>
        <Path fill="#53B1FD" d="m1.46 13.744 17.32-10 1.053 1.823-17.32 10z"></Path>
        <Rect width="7.622" height="1.892" x="14.488" y="20.137" fill="#FCC419" rx="0.499"></Rect>
        <Rect width="7.622" height="1.892" x="15.646" y="18.246" fill="#FFDC72" rx="0.499"></Rect>
        <Rect width="7.622" height="1.892" x="14.488" y="16.354" fill="#FCC419" rx="0.499"></Rect>
        <Circle
          cx="19.94"
          cy="11.62"
          r="1.089"
          fill="#FFDC72"
          transform="rotate(-30.34 19.94 11.62)"
        ></Circle>
        <Circle
          cx="18.641"
          cy="12.38"
          r="1.089"
          fill="#FF922B"
          transform="rotate(-30.34 18.641 12.38)"
        ></Circle>
      </G>
      <Defs>
        <ClipPath id="clip0_32_2248">
          <Path fill="#fff" d="M0 0h24v24H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  );
}
