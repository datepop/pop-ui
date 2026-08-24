import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconQuestionCircle({
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
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            fill={color}
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M11.9516 14.0191V13.805C11.9516 13.2377 12.2846 12.7232 12.8023 12.4909L13.2095 12.3082C13.9969 11.9549 14.5036 11.1722 14.5036 10.3091C14.5036 9.09894 13.5226 8.11792 12.3124 8.11793L11.9626 8.11793C10.7691 8.11794 9.80162 9.08544 9.80162 10.2789"
            stroke="white"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <circle cx="11.9572" cy="16.3739" fill="white" r="0.847778" />{' '}
        </>
      ) : (
        <>
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <path
            d="M11.9516 14.0191V13.805C11.9516 13.2377 12.2846 12.7232 12.8023 12.4909L13.2095 12.3082C13.9969 11.9549 14.5036 11.1722 14.5036 10.3091C14.5036 9.09894 13.5226 8.11792 12.3124 8.11793L11.9626 8.11793C10.7691 8.11794 9.80162 9.08544 9.80162 10.2789"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
          <circle cx="11.9572" cy="16.3739" fill={color} r="0.847778" />{' '}
        </>
      )}
    </svg>
  );
}
