import { ColorGray900 } from '../tokens/colors';

import type { IIconFilledOnlyProps } from '../types/icon';

export default function IconCaretDown({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'filled',
  ...props
}: IIconFilledOnlyProps) {
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
        d="M12.7477 15.5378C12.3474 16.033 11.5925 16.033 11.1922 15.5378L7.22417 10.6286C6.6956 9.97468 7.16104 9 8.00189 9L15.938 9C16.7789 9 17.2443 9.97468 16.7157 10.6286L12.7477 15.5378Z"
        fill={color}
      />
    </svg>
  );
}
