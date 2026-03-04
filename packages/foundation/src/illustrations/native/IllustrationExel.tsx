import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

import type { IIllustrationProps } from '../../types/illustration.native';

export default function IllustrationExel({ size = 24, ...props }: IIllustrationProps) {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
      <G clipPath="url(#clip0_437_2367)">
        <Path
          fill="#185C37"
          d="M15.07 11.4 5.58 9.6v13.3c0 .608.458 1.1 1.023 1.1h16.373c.565 0 1.023-.492 1.023-1.1V18z"
        ></Path>
        <Path
          fill="#21A366"
          d="M15.07 0H6.604C6.04 0 5.581.492 5.581 1.1V6l9.489 6 5.023 1.8L24 12V6z"
        ></Path>
        <Path fill="#107C41" d="M5.581 6h9.489v6H5.58z"></Path>
        <Path
          fill="#000"
          d="M12.372 4.8h-6.79v15h6.79c.565-.002 1.021-.493 1.023-1.1V5.9c-.002-.607-.458-1.098-1.023-1.1"
          opacity="0.1"
        ></Path>
        <Path
          fill="#000"
          d="M11.814 5.4H5.581v15h6.233c.564-.002 1.021-.493 1.023-1.1V6.5c-.002-.607-.459-1.098-1.023-1.1"
          opacity="0.2"
        ></Path>
        <Path
          fill="#000"
          d="M11.814 5.4H5.581v13.8h6.233c.564-.002 1.021-.493 1.023-1.1V6.5c-.002-.607-.459-1.098-1.023-1.1"
          opacity="0.2"
        ></Path>
        <Path
          fill="#000"
          d="M11.256 5.4H5.581v13.8h5.675c.564-.002 1.021-.493 1.023-1.1V6.5c-.002-.607-.459-1.098-1.023-1.1"
          opacity="0.2"
        ></Path>
        <Path
          fill="url(#paint0_linear_437_2367)"
          d="M1.023 5.4h10.233c.565 0 1.023.492 1.023 1.1v11c0 .608-.458 1.1-1.023 1.1H1.023C.458 18.6 0 18.108 0 17.5v-11c0-.608.458-1.1 1.023-1.1"
        ></Path>
        <Path
          fill="#fff"
          d="M3.169 15.575 5.32 11.99 3.349 8.425h1.586l1.076 2.28q.15.324.204.483h.014q.107-.259.224-.503l1.15-2.26h1.456L7.037 11.97l2.074 3.605H7.56l-1.243-2.503a2 2 0 0 1-.148-.334H6.15a1.6 1.6 0 0 1-.144.324l-1.28 2.513z"
        ></Path>
        <Path fill="#33C481" d="M22.977 0H15.07v6H24V1.1c0-.608-.458-1.1-1.023-1.1"></Path>
        <Path fill="#107C41" d="M15.07 12H24v6h-8.93z"></Path>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_437_2367"
          x1="2.133"
          x2="11.046"
          y1="4.541"
          y2="18.901"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#18884F"></Stop>
          <Stop offset="0.5" stopColor="#117E43"></Stop>
          <Stop offset="1" stopColor="#0B6631"></Stop>
        </LinearGradient>
        <ClipPath id="clip0_437_2367">
          <Path fill="#fff" d="M0 0h24v24H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  );
}
