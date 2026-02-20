import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconPrinter({
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
        d="M8.46985 11.4272H15.5299"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M8.46985 14.5371H15.5299"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M8.46985 17.6572H12.0806"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M5.00012 8.23047C5.00012 7.95433 5.22398 7.73047 5.50012 7.73047H18.5001C18.7763 7.73047 19.0001 7.95433 19.0001 8.23047V20.2607C19.0001 21.3653 18.1047 22.2607 17.0001 22.2607H7.00012C5.89555 22.2607 5.00012 21.3653 5.00012 20.2607V8.23047Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M19.1437 10.2775C19.2459 10.2775 19.3459 10.2775 19.4432 10.2775C20.5478 10.2775 21.4432 9.38208 21.4432 8.27751V3.73926C21.4432 2.63469 20.5478 1.73926 19.4432 1.73926H4.55676C3.45219 1.73926 2.55676 2.63469 2.55676 3.73926V8.27751C2.55676 9.38208 3.4521 10.2775 4.55667 10.2775C4.64938 10.2775 4.74438 10.2775 4.84155 10.2775"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="5.60999" cy="4.73926" r="1" fill={color} />
      <circle cx="9.20911" cy="4.73926" r="1" fill={color} />
    </svg>
  );
}
