import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconMoneyCircle({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="20" r="15.8333" stroke={color} strokeWidth="2.5" />
      <path
        d="M13.1179 21.7529H10.8204V19.8646H12.6459L11.0512 13.5071H13.7999L15.0902 19.8646H17.2933L18.5627 13.5071H21.4373L22.7067 19.8646H24.8783L26.1582 13.5071H28.9488L27.3646 19.8646H29.1796V21.7529H26.8925L25.2979 28.1105H22.2975L21.0281 21.7529H18.9509L17.6815 28.1105H14.7021L13.1179 21.7529ZM20.0525 16.9061H19.9266L19.3286 19.8646H20.6504L20.0525 16.9061ZM16.0974 24.8583H16.2967L16.9157 21.7529H15.4679L16.0974 24.8583ZM23.7033 24.8583H23.8711L24.5006 21.7529H23.0843L23.7033 24.8583Z"
        fill={color}
        strokeWidth={0}
      />
    </svg>
  );
}
