import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconListNumber({
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
        d="M21.9155 5.94521C21.9155 6.41927 21.5308 6.804 21.0567 6.804L6.86254 6.804C6.38849 6.804 6.00375 6.41927 6.00375 5.94521C6.00375 5.47116 6.38849 5.08643 6.86254 5.08643L21.0567 5.08643C21.5308 5.08643 21.9155 5.47116 21.9155 5.94521Z"
        fill={color}
      />
      <path
        d="M21.9155 11.9916C21.9155 12.4657 21.5308 12.8504 21.0567 12.8504L6.86254 12.8504C6.38849 12.8504 6.00375 12.4657 6.00375 11.9916C6.00375 11.5175 6.38849 11.1328 6.86254 11.1328L21.0567 11.1328C21.5308 11.1328 21.9155 11.5175 21.9155 11.9916Z"
        fill={color}
      />
      <path
        d="M21.9155 18.0375C21.9155 18.5116 21.5308 18.8963 21.0567 18.8963L6.86254 18.8963C6.38849 18.8963 6.00375 18.5116 6.00375 18.0375C6.00375 17.5634 6.38849 17.1787 6.86254 17.1787L21.0567 17.1787C21.5308 17.1787 21.9155 17.5634 21.9155 18.0375Z"
        fill={color}
      />
      <path
        d="M1.375 5.39844L3 3.99219V7.89844"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.71875 10.0469H3.68752L1.71875 13.4569H3.68752"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.6875 16.1016H3.6875V18.0547M1.6875 20.0078H3.6875V18.0547M3.6875 18.0547H2.43854"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
