import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

export default function IconPhoto({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="8"
        y="8.00015"
        width={32}
        height={32}
        rx="4"
        stroke={color}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4436 16.8887C20.4436 18.8533 18.8527 20.4443 16.8881 20.4443C14.9254 20.4443 13.3325 18.8533 13.3325 16.8887C13.3325 14.9241 14.9254 13.3332 16.8881 13.3332C18.8508 13.3351 20.4417 14.926 20.4436 16.8887Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 32.8893L12.8471 29.254C14.2038 28.2365 16.0548 28.1851 17.4659 29.1258L17.9594 29.4548C19.4333 30.4375 21.378 30.3336 22.7389 29.1995L28.7618 24.1804C30.1486 23.0248 32.1375 22.9412 33.6164 23.9764L40 28.4449"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}
