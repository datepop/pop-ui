import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconText({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.0718 6.23483H14.8062L14.5029 4.22668C14.4541 3.98263 14.3355 3.86061 14.1473 3.86061H11.0828V15.7108C11.0828 15.8154 11.1176 15.9165 11.1873 16.0141C11.264 16.1117 11.3791 16.1675 11.5325 16.1815L12.9026 16.2651V17.1855H7.09783V16.2651L8.46797 16.1815C8.62138 16.1675 8.73294 16.1117 8.80267 16.0141C8.87937 15.9165 8.91772 15.8154 8.91772 15.7108V3.86061H5.83227C5.62309 3.86061 5.50107 3.98263 5.4662 4.22668L5.17335 6.23483H3.92871V2.8147H16.0718V6.23483Z"
        fill={color}
      />
    </svg>
  );
}
