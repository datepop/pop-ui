import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconLink({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M14.1138 7.99707H19.0016C21.2117 7.99707 23 9.78532 23 11.9954C23 14.2055 21.2117 15.9937 19.0016 15.9937H14.1138"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M10.1155 16.003H4.99832C2.78823 16.003 1 14.2148 1 12.0047C1 9.79459 2.78823 8.00635 4.99832 8.00635H10.1155"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M6.99756 11.9954H17.0026"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </Svg>
  );
}
