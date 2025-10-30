import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconChevronLeft({
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
        d="M15.4199 4.58076C15.9276 5.08844 15.9276 5.91155 15.4199 6.41924L9.83916 12L15.4199 17.5808C15.9276 18.0884 15.9276 18.9116 15.4199 19.4192C14.9122 19.9269 14.0891 19.9269 13.5814 19.4192L7.08144 12.9192C6.57376 12.4116 6.57376 11.5884 7.08144 11.0808L13.5814 4.58076C14.0891 4.07308 14.9122 4.07308 15.4199 4.58076Z"
        fill={color}
      />
    </svg>
  );
}
