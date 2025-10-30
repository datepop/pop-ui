import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconListMenu({
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
      <g id="list_menu">
        <g id="Group 265">
          <g id="Group 740">
            <rect
              id="Rectangle 487"
              x="9"
              y="4"
              width="12"
              height="2"
              rx="1"
              fill={color}
            />
            <rect
              id="Rectangle 490"
              x="3"
              y="4"
              width="4"
              height="2"
              rx="1"
              fill={color}
            />
          </g>
          <g id="Group 742">
            <rect
              id="Rectangle 487_2"
              x="9"
              y="12"
              width="12"
              height="2"
              rx="1"
              fill={color}
            />
            <rect
              id="Rectangle 490_2"
              x="3"
              y="12"
              width="4"
              height="2"
              rx="1"
              fill={color}
            />
          </g>
          <g id="Group 741">
            <rect
              id="Rectangle 487_3"
              x="9"
              y="19"
              width="12"
              height="2"
              rx="1"
              fill={color}
            />
            <rect
              id="Rectangle 490_3"
              x="3"
              y="19"
              width="4"
              height="2"
              rx="1"
              fill={color}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
