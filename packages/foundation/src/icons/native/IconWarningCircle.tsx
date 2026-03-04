import { Circle, Path, Svg } from 'react-native-svg';

import { ColorGray900, SemanticColorBgWhite } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconWarningCircle({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle
        cx="12"
        cy="12"
        r="10"
        fill={isFilled ? color : 'none'}
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0046 15.2893C12.6552 15.2893 13.181 15.8152 13.181 16.4658C13.181 17.1164 12.6552 17.6422 12.0046 17.6422C11.354 17.6422 10.8222 17.1164 10.8222 16.4658C10.8222 15.8152 11.3434 15.2893 11.9928 15.2893H12.0046ZM11.993 6.6518C12.4801 6.6518 12.8754 7.047 12.8754 7.5341V12.733C12.8754 13.22 12.4801 13.6153 11.993 13.6153C11.506 13.6153 11.1107 13.22 11.1107 12.733V7.5341C11.1107 7.047 11.506 6.6518 11.993 6.6518Z"
        fill={isFilled ? SemanticColorBgWhite : color}
        strokeWidth={0}
      />
    </Svg>
  );
}
