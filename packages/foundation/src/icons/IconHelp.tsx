import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHelp({
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
      <path
        d="M5 18.1349V11C5 7.134 8.134 4 12 4C15.866 4 19 7.134 19 11V16.129C19 16.8161 18.4176 20 14.5058 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1.5 12.5C1.5 10.567 3.067 9 5 9V16.5C3.067 16.5 1.5 14.933 1.5 13V12.5Z"
        fill={color}
      />
      <path
        d="M22.5 12.5C22.5 10.567 20.933 9 19 9V16.5C20.933 16.5 22.5 14.933 22.5 13V12.5Z"
        fill={color}
      />
      <circle cx="9.25" cy="11.5" r="0.75" fill={color} />
      <circle cx="14.75" cy="11.5" r="0.75" fill={color} />
      <path
        d="M10 16C10 16 10.5818 17 12 17C13.4182 17 14 16 14 16"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
