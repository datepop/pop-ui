import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconPhoto({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.222 8.4444C10.222 9.4267 9.4265 10.2222 8.4442 10.2222C7.4629 10.2222 6.6664 9.4267 6.6664 8.4444C6.6664 7.4621 7.4629 6.6667 8.4442 6.6667C9.4255 6.6676 10.221 7.4631 10.222 8.4444Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16.4444L6.4235 14.6267C7.1019 14.1179 8.0274 14.0923 8.7329 14.5627L8.9797 14.7271C9.7166 15.2185 10.689 15.1665 11.3695 14.5995L14.3809 12.0899C15.0743 11.5121 16.0688 11.4703 16.8082 11.9879L20 14.2222"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
