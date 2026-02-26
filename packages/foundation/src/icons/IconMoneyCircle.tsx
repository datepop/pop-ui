import { ColorGray900, SemanticColorBgWhite } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconMoneyCircle({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        fill={isFilled ? color : 'none'}
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M7.8707 13.0517H6.4922V11.9188H7.5875L6.6307 8.1043H8.2799L9.0541 11.9188H10.376L11.1376 8.1043H12.8624L13.624 11.9188H14.927L15.6949 8.1043H17.3693L16.4188 11.9188H17.5078V13.0517H16.1355L15.1787 16.8663H13.3785L12.6169 13.0517H11.3705L10.6089 16.8663H8.8213L7.8707 13.0517ZM12.0315 10.1437H11.956L11.5972 11.9188H12.3902L12.0315 10.1437ZM9.6584 14.915H9.778L10.1494 13.0517H9.2807L9.6584 14.915ZM14.222 14.915H14.3227L14.7004 13.0517H13.8506L14.222 14.915Z"
        fill={isFilled ? SemanticColorBgWhite : color}
        strokeWidth={0}
      />
    </svg>
  );
}
