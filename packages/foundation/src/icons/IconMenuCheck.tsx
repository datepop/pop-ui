import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconMenuCheck({
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
      {isFilled ? (
        <>
          <path
            d="M14.9999 17.5L17.1175 19.5L20.9999 15.5"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M17 2.25C18.5188 2.25 19.75 3.48122 19.75 5V13.3838C19.75 13.5369 19.6709 13.6769 19.5537 13.7754L19.3857 13.9326L17.3916 15.9863C17.2012 16.1823 16.8883 16.1893 16.6895 16.002L16.5439 15.8643C15.6406 15.0115 14.2174 15.052 13.3643 15.9551C12.5111 16.8585 12.5518 18.2825 13.4551 19.1357L15.5 21C15.8015 21.2324 15.576 21.75 15.1953 21.75H5.05859C3.53277 21.7499 2.25 20.5345 2.25 19V5C2.25 3.46552 3.53277 2.25011 5.05859 2.25H17ZM7 14.75C6.58579 14.75 6.25 15.0858 6.25 15.5C6.25 15.9142 6.58579 16.25 7 16.25H11C11.4142 16.25 11.75 15.9142 11.75 15.5C11.75 15.0858 11.4142 14.75 11 14.75H7ZM7 11.25C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H7ZM7 7.75C6.58579 7.75 6.25 8.08579 6.25 8.5C6.25 8.91421 6.58579 9.25 7 9.25H15C15.4142 9.25 15.75 8.91421 15.75 8.5C15.75 8.08579 15.4142 7.75 15 7.75H7Z"
            fill={color}
          />{' '}
        </>
      ) : (
        <>
          <path
            d="M6.99988 8.5H14.9999"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M6.99988 12H14.9999"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M14.9999 17.5L17.1175 19.5L20.9999 15.5"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M6.99988 15.5H10.9999"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M13.5719 21L5.05875 21C3.9264 21 2.99994 20.1 2.99994 19L2.99994 5C2.99994 3.9 3.9264 3 5.05875 3L5.981 3L16.9999 3C18.1045 3 18.9999 3.89543 18.9999 5L18.9999 13"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />{' '}
        </>
      )}
    </svg>
  );
}
