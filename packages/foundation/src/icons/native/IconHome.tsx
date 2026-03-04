import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconHome({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20.1671 9.0322V19.2757C20.1671 20.3831 19.2698 21.2804 18.1624 21.2804H5.8474C4.74 21.2804 3.8426 20.3831 3.8426 19.2757V9.0322"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <Path
        d="M2 10.426L10.5536 3.2566C11.3842 2.5406 12.6157 2.5406 13.4462 3.2566L22 10.4356"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.1791 21.2804V16.6886C9.1791 15.5812 10.0765 14.6838 11.1839 14.6838H12.8354C13.9428 14.6838 14.8402 15.5812 14.8402 16.6886V21.2804"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
