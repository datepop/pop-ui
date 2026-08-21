import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconRestaurant({
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
          <rect
            x="6.61951"
            y="11.4043"
            width="2.56812"
            height="10.3669"
            rx="1.28406"
            stroke={color}
            strokeWidth="1.5"
            fill={color}
          />
          <path
            d="M7.90351 9.07377C9.32721 9.07377 10.4813 7.54152 10.4813 5.65139C10.4813 3.76126 9.32721 2.229 7.90351 2.229C6.47982 2.229 5.32568 3.76126 5.32568 5.65139C5.32568 7.54152 6.47982 9.07377 7.90351 9.07377Z"
            stroke={color}
            strokeWidth="1.5"
            fill={color}
          />
          <rect
            x="15.0516"
            y="11.4043"
            width="2.56812"
            height="10.3669"
            rx="1.28406"
            stroke={color}
            strokeWidth="1.5"
            fill={color}
          />
          <path
            d="M14.371 6.24414H18.2943V7.43851C18.2943 8.52189 17.416 9.40015 16.3326 9.40015V9.40015C15.2492 9.40015 14.371 8.52189 14.371 7.43851V6.24414Z"
            stroke={color}
            strokeWidth="1.5"
            fill={color}
          />
          <path d="M14.371 2.229V6.00637" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16.3357 2.229V5.82149" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18.2942 2.229V6.00637" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M7.90356 10.7414L7.90356 9.19141"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M16.3357 10.7416L16.3357 9.40039"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />{' '}
        </>
      ) : (
        <>
          <path d="M7.49988 12L7.49988 9" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
          <path d="M16.5 3L16.5 12" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
          <path d="M14.5 3L14.5 6" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
          <path d="M18.5 3L18.5 6" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
          <rect height="9" rx="1.5" stroke={color} strokeWidth="1.5" width="3" x="6" y="12" />
          <rect height="9" rx="1.5" stroke={color} strokeWidth="1.5" width="3" x="15" y="12" />
          <path
            d="M14.5 6V7C14.5 8.10457 15.3954 9 16.5 9C17.6046 9 18.5 8.10457 18.5 7V6"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M7.5 9C8.88071 9 10 7.65686 10 6C10 4.34315 8.88071 3 7.5 3C6.11929 3 5 4.34315 5 6C5 7.65686 6.11929 9 7.5 9Z"
            stroke={color}
            strokeWidth="1.5"
          />{' '}
        </>
      )}
    </svg>
  );
}
