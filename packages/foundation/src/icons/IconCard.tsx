import { useId } from "react";

import { ColorGray900 } from "../tokens/colors";

import type { IIconProps } from "../types/icon";

export default function IconCard({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';
  const maskId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {isFilled && (
        <mask id={maskId}>
          <rect x="4.5" y="1.5" width="15" height="21" rx="2" fill="white" />
          <rect x="10.8462" y="4.92773" width="2.30762" height="3" rx="0.5" fill="black" />
        </mask>
      )}
      <rect
        x="4.5"
        y="1.5"
        width="15"
        height="21"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill={isFilled ? color : 'none'}
        mask={isFilled ? `url(#${maskId})` : undefined}
      />
      {!isFilled && (
        <rect
          x="10.8462"
          y="4.92773"
          width="2.30762"
          height="3"
          rx="0.5"
          fill={color}
        />
      )}
    </svg>
  );
}
