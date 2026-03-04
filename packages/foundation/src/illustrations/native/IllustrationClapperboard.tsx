import { ClipPath, Defs, G, LinearGradient, Mask, Path, Stop, Svg } from 'react-native-svg';

import type { IIllustrationProps } from '../../types/illustration.native';

export default function IllustrationClapperboard({ size = 24, ...props }: IIllustrationProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_371_2261)">
        <Path
          fill="url(#paint0_linear_371_2261)"
          d="M21.32 19.389c0 1.161-.94 2.111-2.089 2.111H5.651c-1.148 0-2.088-.95-2.088-2.111v-6.861c0-1.161.94-2.111 2.089-2.111H19.23c1.149 0 2.09.95 2.09 2.11z"
        ></Path>
        <Path
          fill="#fff"
          d="M3.563 11.25c0-.46.373-.833.833-.833h16.09c.461 0 .834.373.834.833v2.861H3.563z"
        ></Path>
        <Mask
          id="mask0_371_2261"
          width="19"
          height="5"
          x="3"
          y="10"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          <Path
            fill="#DFE2F6"
            d="M3.563 11.25c0-.46.373-.833.833-.833h16.09c.461 0 .834.373.834.833v2.861H3.563z"
          ></Path>
        </Mask>
        <G mask="url(#mask0_371_2261)">
          <Path
            fill="url(#paint1_linear_371_2261)"
            d="M3.563 10.417h2.089l-2.09 3.694zm5.745 0-2.09 3.694h3.656l2.09-3.694zm7.312 0-2.09 3.694h3.656l2.09-3.694z"
          ></Path>
        </G>
        <Path
          fill="#fff"
          d="M2.878 7.637a.833.833 0 0 1 .606-1.008L19.1 2.704a.833.833 0 0 1 1.013.61l.484 1.965a.833.833 0 0 1-.606 1.008L4.375 10.213a.833.833 0 0 1-1.013-.61z"
        ></Path>
        <Mask
          id="mask1_371_2261"
          width="19"
          height="9"
          x="2"
          y="2"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          <Path
            fill="#DFE2F6"
            d="M2.878 7.637a.833.833 0 0 1 .606-1.008L19.1 2.704a.833.833 0 0 1 1.013.61l.484 1.965a.833.833 0 0 1-.606 1.008L4.375 10.213a.833.833 0 0 1-1.013-.61z"
          ></Path>
        </Mask>
        <G mask="url(#mask1_371_2261)">
          <Path
            fill="url(#paint2_linear_371_2261)"
            d="m2.68 6.831 2.91 3.076-2.027.51zm10.006 1.292-2.91-3.075-3.548.892 2.91 3.075zm7.096-1.783-2.91-3.076-3.549.892 2.91 3.075z"
          ></Path>
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_371_2261"
          x1="5.329"
          x2="8.73"
          y1="10.417"
          y2="24.175"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.019" stopColor="#FF9E9E"></Stop>
          <Stop offset="1" stopColor="#C09AFF"></Stop>
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_371_2261"
          x1="5.225"
          x2="5.648"
          y1="10.417"
          y2="15.246"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.019" stopColor="#FF9E9E"></Stop>
          <Stop offset="1" stopColor="#C09AFF"></Stop>
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_371_2261"
          x1="4.381"
          x2="5.9"
          y1="3.264"
          y2="12.434"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.019" stopColor="#FF9E9E"></Stop>
          <Stop offset="1" stopColor="#C09AFF"></Stop>
        </LinearGradient>
        <ClipPath id="clip0_371_2261">
          <Path fill="#fff" d="M2.599 2.5h18.802v19H2.599z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  );
}
