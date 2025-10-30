import React from 'react';
import type { IconProps } from '../types/icon';
import { ColorGray900 } from '../tokens/colors';

const IcChevronRight: React.FC<IconProps> = ({
  size = 8,
  color = ColorGray900,
  ...props
}) => {
  const width = size;
  const height = size * 1.75;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1L7 7L1 13"
        stroke={color}
      />
    </svg>
  );
};

export default IcChevronRight;
