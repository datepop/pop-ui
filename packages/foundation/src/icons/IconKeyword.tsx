import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconKeyword({
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
      <g>
        <g>
          <g>
            <path d="M3 11H10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 18.5H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 4H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <g>
              <g>
                <g>
                  <path
                    d="M19.4564 15.8287C21.0185 14.2666 21.0185 11.7339 19.4565 10.1718C17.8944 8.60973 15.3617 8.60972 13.7996 10.1718C12.2375 11.7339 12.2375 14.2666 13.7996 15.8287C15.3617 17.3908 17.8943 17.3908 19.4564 15.8287Z"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M19.3665 15.9189L22.3665 18.9189"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
