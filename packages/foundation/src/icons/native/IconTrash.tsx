import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconLineOnlyProps } from '../../types/icon.native';

export default function IconTrash({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4.625 6.92H19.265V19.9801C19.265 21.08 18.365 21.98 17.265 21.98H6.625C5.525 21.98 4.625 21.08 4.625 19.9801V6.92Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <Path
        d="M9.565 9.33V19.57"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M14.325 9.33V19.57"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M19.235 4.29H4.765C4.036 4.29 3.445 4.8788 3.445 5.605C3.445 6.3313 4.036 6.92 4.765 6.92H19.235C19.964 6.92 20.555 6.3313 20.555 5.605C20.555 4.8788 19.964 4.29 19.235 4.29Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <Path
        d="M8.875 4.42V3.22C8.875 2.56 9.425 2.02 10.105 2.02H13.795C14.475 2.02 15.025 2.56 15.025 3.22V4.42"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </Svg>
  );
}
