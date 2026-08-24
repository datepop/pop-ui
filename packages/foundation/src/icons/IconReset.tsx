import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconReset({
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
      <g transform="translate(24 0) scale(-1 1)">
        <path
          d="M18.364 5.63604C16.82 4.09209 14.7674 3.16208 12.5886 3.01927C10.4098 2.87646 8.25341 3.53061 6.52115 4.85982C4.78888 6.18903 3.59891 8.10267 3.17293 10.2442C2.74696 12.3857 3.11403 14.6091 4.20577 16.5C5.29751 18.3909 7.03945 19.8205 9.10704 20.5224C11.1746 21.2242 13.4269 21.1505 15.4441 20.3149C17.4614 19.4793 19.1061 17.9389 20.0719 15.9806C21.0376 14.0223 21.2585 11.7797 20.6933 9.67063"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M15.7 6L18.7 6L18.7 3"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
