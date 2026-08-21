import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconText({
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
      <rect height="18" rx="2" stroke={color} strokeWidth="1.5" width="18" x="3" y="3" />
      <path d="M9.6814 16.738H14.3154" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
      <path
        d="M7.31079 8.57739L8.13571 7.5688C8.32564 7.33659 8.60978 7.2019 8.90978 7.2019H15.0897C15.3897 7.2019 15.6739 7.33659 15.8638 7.5688L16.6887 8.57739"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M12.0039 7.31836L12.0039 16.2937"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
