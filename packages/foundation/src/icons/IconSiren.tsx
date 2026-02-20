import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconSiren({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
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
        d="M12.015 3.25488C16.175 3.25488 19.545 6.62488 19.545 10.7849V17.5149C19.545 17.8049 19.305 18.0449 19.015 18.0449H5.01499C4.72499 18.0449 4.48499 17.8049 4.48499 17.5149V10.7849C4.48499 6.62488 7.85499 3.25488 12.015 3.25488Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M20.3449 18.0547H3.65495C2.91488 18.0547 2.31494 18.6546 2.31494 19.3947V19.4047C2.31494 20.1447 2.91488 20.7447 3.65495 20.7447H20.3449C21.085 20.7447 21.6849 20.1447 21.6849 19.4047V19.3947C21.6849 18.6546 21.085 18.0547 20.3449 18.0547Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M9.91492 6.94482C9.91492 6.94482 8.35492 7.39482 7.79492 9.43482"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
