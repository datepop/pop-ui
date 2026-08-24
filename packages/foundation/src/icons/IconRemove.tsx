import { ColorGray900 } from '../tokens/colors';

import type { IIconProps } from '../types/icon';

export default function IconRemove({
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
            d="M11.9995 1.99951C17.5222 1.99951 21.9993 6.47683 21.9995 11.9995C21.9995 17.5224 17.5224 21.9995 11.9995 21.9995C6.47683 21.9993 1.99951 17.5222 1.99951 11.9995C1.99971 6.47695 6.47695 1.99971 11.9995 1.99951Z"
            fill={color}
          />
          <path d="M7 12H17" stroke="white" strokeLinecap="round" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <path
            d="M11.9995 2.25049C17.3843 2.25049 21.7495 6.61571 21.7495 12.0005C21.7492 17.385 17.3841 21.7505 11.9995 21.7505C6.6149 21.7505 2.24978 17.385 2.24951 12.0005C2.24951 6.61571 6.61474 2.25049 11.9995 2.25049ZM11.9995 3.75049C7.44316 3.75049 3.74951 7.44414 3.74951 12.0005C3.74978 16.5566 7.44333 20.2505 11.9995 20.2505C16.5557 20.2505 20.2492 16.5566 20.2495 12.0005C20.2495 7.44414 16.5559 3.75049 11.9995 3.75049Z"
            fill={color}
          />
          <path d="M7 12H17" stroke={color} strokeLinecap="round" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}
