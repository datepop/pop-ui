import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconXCircle({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
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
            d="M11.9995 1.99951C17.5222 1.99951 21.9993 6.47683 21.9995 11.9995C21.9995 17.5224 17.5224 21.9995 11.9995 21.9995C6.47683 21.9993 1.99951 17.5222 1.99951 11.9995C1.99971 6.47695 6.47695 1.99971 11.9995 1.99951Z"
            fill={color}
          />
          <path d="M9 9L15 15" stroke="white" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M15 9L9 15" stroke="white" strokeLinecap="round" strokeWidth="1.5" />{' '}
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
          <path d="M9 9L15 15" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
          <path d="M15 9L9 15" stroke={color} strokeLinecap="round" strokeWidth="1.5" />{' '}
        </>
      )}
    </svg>
  );
}
