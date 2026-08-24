import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconReport2({
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
      <g>
        <path
          d="M20 18H4V10.875C4 9.84084 4.20734 8.81664 4.60938 7.86121C5.01141 6.90588 5.60009 6.03746 6.34288 5.30627C7.08568 4.57508 7.96788 3.99561 8.93837 3.59985C9.90897 3.2041 10.9494 3 12 3C13.0506 3 14.091 3.2041 15.0616 3.59985C16.0321 3.99561 16.9143 4.57508 17.6571 5.30627C18.3999 6.03746 18.9886 6.90588 19.3906 7.86121C19.7927 8.81664 20 9.84084 20 10.875V18Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <rect x="2.5" y="18" width="19" height="3" rx="1.5" stroke={color} strokeWidth="1.5" />
        <path
          d="M9.91492 6.94482C9.91492 6.94482 8.35492 7.39482 7.79492 9.43482"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
