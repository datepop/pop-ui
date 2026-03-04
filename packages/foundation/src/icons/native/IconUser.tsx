import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconUp({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12.005 10.785C14.2804 10.785 16.125 8.9404 16.125 6.665C16.125 4.3896 14.2804 2.545 12.005 2.545C9.7296 2.545 7.885 4.3896 7.885 6.665C7.885 8.9404 9.7296 10.785 12.005 10.785Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 1.5}
      />
      <Path
        d="M9.885 13.485H14.125C17.105 13.485 19.515 15.905 19.515 18.875V19.575C19.515 20.615 18.675 21.455 17.635 21.455H6.365C5.325 21.455 4.485 20.615 4.485 19.575V18.875C4.485 15.895 6.905 13.485 9.875 13.485H9.885Z"
        stroke={color}
        strokeMiterlimit="10"
        fill={isFilled ? color : 'none'}
        strokeWidth={isFilled ? 0 : 1.5}
      />
    </Svg>
  );
}
