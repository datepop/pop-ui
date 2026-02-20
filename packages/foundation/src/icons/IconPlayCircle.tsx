import { ColorGray900 } from "../tokens/colors";
import { IIconProps } from "../types/icon";

export default function IconPlayCircle({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
  ...props}: IIconProps     ) {
    return(
         <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <rect width="32" height="32" fill={color} fillOpacity="0.6" rx="16"></rect>
    <path
      fill="#fff"
      d="M21.824 15.338c.429.337.429.987 0 1.325l-7.128 5.6a.842.842 0 0 1-1.363-.662V10.4a.842.842 0 0 1 1.363-.663z"
    ></path>
  </svg>
    )
  }