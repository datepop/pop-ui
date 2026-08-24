import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconPhoneClock({
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
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path
        d="M12 7V12H16"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M14.5927 19.9431L12.21 18.4748C11.9506 18.3021 11.6239 18.2829 11.3261 18.4268L10.2019 18.9546C6.38764 17.8414 5.28274 14.8569 4.97529 13.974L5.57098 12.6881C5.7151 12.4002 5.69588 12.0643 5.53255 11.8052L4.06255 9.42521C3.8704 9.10853 3.49569 8.93579 3.1306 9.02216C2.85197 9.07974 2.5157 9.21409 2.18903 9.4636C1.70864 9.83787 1.25707 10.4808 1.02648 11.6228C0.968838 11.9107 1.00727 12.1986 1.12256 12.4769C2.04491 14.6266 3.21707 17.0449 5.11941 18.945C6.98333 20.8068 9.33724 21.9584 11.4606 22.87C11.72 22.9852 12.0274 23.0332 12.3157 22.9756C13.4686 22.7549 14.1315 22.3038 14.5159 21.8144C14.7849 21.4977 14.9194 21.1618 14.977 20.8644C15.0635 20.4901 14.9002 20.1254 14.5831 19.9239L14.5927 19.9431Z"
        fill={color}
      />
    </svg>
  );
}
