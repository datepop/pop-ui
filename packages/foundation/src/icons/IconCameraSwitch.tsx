import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconCameraSwitch({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
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
        d="M18.5 11.6429C18.4998 12.9446 17.4667 14 16.1923 14H7.80769C6.53329 14 5.50016 12.9446 5.5 11.6429V6.99414C5.50005 5.69241 6.53322 4.63706 7.80769 4.63706H8.41797L8.63251 4.08831C8.88905 3.43133 9.51126 3.00016 10.2037 3H13.7963C14.4887 3.00016 15.111 3.43133 15.3675 4.08831L15.582 4.63706H16.1923C17.4668 4.63706 18.4999 5.69241 18.5 6.99414V11.6429Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle cx="15.25" cy="6.75" fill={color} r="0.75" />
      <circle cx="12" cy="9" r="2" stroke={color} strokeWidth="1.5" />
      <path
        d="M15 19.7024C19.0571 18.9192 22 16.5893 22 13.837C22 12.8137 21.5932 11.8487 20.8735 11"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M9 19.7024C4.94289 18.9192 2 16.5893 2 13.837C2 12.8137 2.40682 11.8487 3.12648 11"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M7.75 17.5L8.83397 19.126C9.06374 19.4706 8.97061 19.9363 8.62596 20.166L7 21.25"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
