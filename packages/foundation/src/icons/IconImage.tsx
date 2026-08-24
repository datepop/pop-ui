import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconImage({
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
        clipRule="evenodd"
        d="M10 8C10 9.10509 9.10509 10 8 10C6.89599 10 6 9.10509 6 8C6 6.89491 6.89599 6 8 6C9.10401 6.00108 9.99892 6.89599 10 8Z"
        fillRule="evenodd"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M3 16.9999L5.7579 14.5867C6.47905 13.9557 7.54641 13.9249 8.30279 14.5132L8.62601 14.7646C9.41372 15.3772 10.5325 15.3155 11.248 14.6199L14.7217 11.2427C15.4502 10.5345 16.5939 10.485 17.3809 11.1276L21 14.0832"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect height="18" rx="2" stroke={color} strokeWidth="1.5" width="18" x="3" y="3" />
    </svg>
  );
}
