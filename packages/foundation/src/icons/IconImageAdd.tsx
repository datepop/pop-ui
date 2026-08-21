import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconImageAdd({
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
        d="M19 12.6V5C19 3.89543 18.1046 3 17 3H5C3.89543 3 3 3.89543 3 5V17C3 18.1046 3.89543 19 5 19H12.6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 7.5C9 8.32882 8.32882 9 7.5 9C6.67199 9 6 8.32882 6 7.5C6 6.67118 6.67199 6 7.5 6C8.32801 6.00081 8.99919 6.67199 9 7.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 15.2L5.3391 13.2264C6.0511 12.6256 7.08358 12.596 7.82884 13.155L7.87913 13.1927C8.65584 13.7752 9.73872 13.7158 10.447 13.0518L13.3012 10.376C14.0225 9.69979 15.1296 9.65211 15.9064 10.2638L19 12.7"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <path d="M16.25 19H21.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 16.25V21.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
