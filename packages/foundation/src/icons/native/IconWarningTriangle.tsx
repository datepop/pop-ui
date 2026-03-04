import { Path, Svg } from 'react-native-svg';

import { ColorGray900, SemanticColorBgWhite } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconWarningTriangle({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M2.3498 18.1694L10.7279 4.7643C11.3155 3.8243 12.6844 3.8243 13.2719 4.7643L21.6502 18.1694C22.2746 19.1685 21.5563 20.4644 20.3782 20.4644H3.6217C2.4436 20.4644 1.7253 19.1685 2.3498 18.1694Z"
        fill={isFilled ? color : 'none'}
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M11.9923 8.3878C12.4291 8.3878 12.7836 8.7422 12.7836 9.179V13.8411C12.7836 14.2778 12.4291 14.6323 11.9923 14.6323C11.5556 14.6323 11.201 14.2778 11.201 13.8411V9.179C11.201 8.7422 11.5556 8.3878 11.9923 8.3878Z"
        fill={isFilled ? SemanticColorBgWhite : color}
        strokeWidth={0}
      />
      <Path
        d="M12.0026 16.1335C12.5861 16.1335 13.0577 16.6051 13.0577 17.1885C13.0577 17.7719 12.5861 18.2435 12.0026 18.2435C11.4193 18.2435 10.9424 17.7719 10.9424 17.1885C10.9424 16.6051 11.4097 16.1335 11.9921 16.1335H12.0026Z"
        fill={isFilled ? SemanticColorBgWhite : color}
        strokeWidth={0}
      />
    </Svg>
  );
}
