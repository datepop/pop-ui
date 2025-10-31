import { ColorGray900, SemanticColorBgWhite } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconMapMarker({
  size = 24,
  color = ColorGray900,
  filled = false,
  ...props
}: IIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M33.2968 17.1853C32.4556 25.7853 26.2866 32.9186 22.6589 36.4353C21.1867 37.8686 18.7682 37.8686 17.2961 36.4353C13.3879 32.652 6.64062 24.6186 6.64062 15.2186C6.64062 8.00197 12.9673 2.1853 20.6259 2.50197C28.4598 2.8353 34.0153 9.75197 33.2968 17.1686V17.1853Z"
        stroke={color}
        strokeWidth={filled ? 0 : 2.5}
        strokeMiterlimit="10"
        fill={filled ? color : undefined}
      />
      <path
        d="M20.2452 20.2686C22.9606 20.2686 25.1619 18.0674 25.1619 15.352C25.1619 12.6366 22.9606 10.4353 20.2452 10.4353C17.5298 10.4353 15.3286 12.6366 15.3286 15.352C15.3286 18.0674 17.5298 20.2686 20.2452 20.2686Z"
        stroke={color}
        strokeWidth={filled ? 0 : 2.5}
        fill={filled ? SemanticColorBgWhite : undefined}
        strokeMiterlimit="10"
      />
    </svg>
  );
}
