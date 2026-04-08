import { ColorGray900, ColorWhite } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconPopdeal({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

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
        d="M18.5158 22H5.4937C4.4093 22 3.5323 21.0947 3.5323 19.9726L4.513 7.7992C4.513 6.677 5.3899 5.7718 6.4744 5.7718H17.5257C18.6101 5.7718 19.487 6.677 19.487 7.7992L20.4677 19.9726C20.4677 21.0947 19.5908 22 18.5064 22H18.5158Z"
        stroke={isFilled ? undefined : color}
        strokeWidth={isFilled ? undefined : '1.5'}
        strokeMiterlimit={isFilled ? undefined : '10'}
        fill={isFilled ? color : 'none'}
      />
      <path
        d="M8.5206 7.0071V5.4889C8.5206 3.5653 10.0859 2 12.0095 2C13.9332 2 15.4985 3.5653 15.4985 5.4889V7.0071"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M9.8501 18.7751C11.2457 19.2749 12.7733 19.2749 14.1688 18.7751"
        stroke={isFilled ? ColorWhite : color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.538 10.1188H9.7652C9.6898 10.1188 9.6143 10.1848 9.6143 10.2697V15.9839C9.6143 16.0688 9.6898 16.1443 9.7652 16.1443H10.9345C11.0194 16.1443 11.0854 16.0783 11.0854 15.9934V15.0881C11.0854 14.9844 11.1702 14.8996 11.2645 14.8996H11.5285C13.3013 14.8996 14.3951 14.032 14.3951 12.5233C14.3951 11.0146 13.3013 10.1282 11.5285 10.1282L11.538 10.1188ZM11.6134 13.4569H11.2739C11.1797 13.4569 11.0948 13.3814 11.0948 13.2777V11.7407C11.0948 11.6369 11.1797 11.552 11.2739 11.552H11.6134C12.5092 11.552 12.9053 11.7784 12.9053 12.5139C12.9053 13.2494 12.5281 13.4663 11.6134 13.4663V13.4569Z"
        fill={isFilled ? ColorWhite : color}
      />
    </svg>
  );
}
