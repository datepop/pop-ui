import { ColorGray900, SemanticColorBgWhite } from "../tokens/colors";

import type { IconProps } from "../types/icon";

interface IconMapMarkerProps extends IconProps {
  border?: string;
}

export default function IconMapMarker({
  size = 24,
  color = ColorGray900,
  border = SemanticColorBgWhite,
  ...props
}: IconMapMarkerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.75293 13.6914C5.75293 6.62953 11.6406 0.936517 18.7686 1.2627L18.7676 1.26367C26.0046 1.58748 31.0642 8.17833 30.5908 15.2178L30.5635 15.5527V15.5537C29.8101 23.6524 24.3179 30.2832 21.1777 33.4844L21.1787 33.4854C19.5264 35.177 16.8096 35.177 15.1572 33.4854V33.4844C11.7574 30.0379 5.75298 22.5631 5.75293 13.6914Z"
        fill={color}
        stroke={border}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M18.4084 18.2387C20.8523 18.2387 22.8334 16.2575 22.8334 13.8137C22.8334 11.3698 20.8523 9.38867 18.4084 9.38867C15.9645 9.38867 13.9834 11.3698 13.9834 13.8137C13.9834 16.2575 15.9645 18.2387 18.4084 18.2387Z"
        fill={border}
      />
    </svg>
  );
}
