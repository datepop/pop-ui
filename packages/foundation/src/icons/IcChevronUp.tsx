import React from 'react';
import type { IconProps } from '../types/icon';
import { ColorGray900 } from '../tokens/colors';

const IcChevronUp: React.FC<IconProps> = ({
  size = 24,
  color = ColorGray900,
  ...props
}) => {
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
        d="M18 15L12 9L6 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IcChevronUp;
