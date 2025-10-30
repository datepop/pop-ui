import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconChevronRight({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
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
        d="M8.58094 4.58076C8.07326 5.08844 8.07326 5.91155 8.58094 6.41924L14.1617 12L8.58094 17.5808C8.07326 18.0884 8.07326 18.9116 8.58094 19.4192C9.08862 19.9269 9.91174 19.9269 10.4194 19.4192L16.9194 12.9192C17.4271 12.4116 17.4271 11.5884 16.9194 11.0808L10.4194 4.58076C9.91173 4.07308 9.08862 4.07308 8.58094 4.58076Z"
        fill={color}
      />
    </svg>
  );
}
