import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconClose({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.33096 4.33096C4.83864 3.82327 5.66175 3.82327 6.16943 4.33096L12.0002 10.1617L17.8309 4.33096C18.3386 3.82327 19.1617 3.82327 19.6694 4.33096C20.1771 4.83864 20.1771 5.66175 19.6694 6.16943L13.8387 12.0002L19.6694 17.831C20.1771 18.3386 20.1771 19.1618 19.6694 19.6694C19.1617 20.1771 18.3386 20.1771 17.8309 19.6694L12.0002 13.8387L6.16943 19.6694C5.66175 20.1771 4.83864 20.1771 4.33096 19.6694C3.82328 19.1618 3.82328 18.3386 4.33096 17.831L10.1617 12.0002L4.33096 6.16943C3.82328 5.66175 3.82328 4.83864 4.33096 4.33096Z"
        fill={color}
      />
    </svg>
  );
}
