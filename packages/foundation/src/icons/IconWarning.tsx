import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconWarning({
  size = 24,
  color = ColorGray900,
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
        d="M19.9872 13.9796C20.7152 13.9796 21.306 14.5704 21.306 15.2984V23.0685C21.306 23.7964 20.7152 24.3872 19.9872 24.3872C19.2593 24.3872 18.6684 23.7964 18.6684 23.0685V15.2984C18.6684 14.5704 19.2593 13.9796 19.9872 13.9796Z"
        fill={color}
        strokeWidth={0}
      />
      <path
        d="M20.0044 26.8892C20.9768 26.8892 21.7628 27.6752 21.7628 28.6475C21.7628 29.6199 20.9768 30.4059 20.0044 30.4059C19.0321 30.4059 18.2373 29.6199 18.2373 28.6475C18.2373 27.6752 19.0162 26.8892 19.9869 26.8892H20.0044Z"
        fill={color}
        strokeWidth={0}
      />
      <path
        d="M3.91626 30.2824L17.8799 7.94058C18.8591 6.37391 21.1407 6.37391 22.1199 7.94058L36.0836 30.2824C37.1243 31.9475 35.9271 34.1074 33.9636 34.1074H6.03625C4.07266 34.1074 2.87556 31.9475 3.91626 30.2824Z"
        stroke={color}
        strokeWidth="2.5"
      />
    </svg>
  );
}
