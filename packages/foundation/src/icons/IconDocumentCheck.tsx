import { ColorGray900 } from '../tokens/colors';

import type { IIconLineOnlyProps } from '../types/icon';

export default function IconDocumentCheck({
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
          <path
            d="M6.99988 8.50002H11.9999"
            stroke={color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M6.99988 12H11.9999"
            stroke={color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M14.9999 17.5L17.1175 19.5L20.9999 15.5"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.99988 15.5H9.99988"
            stroke={color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M18.4999 3.00006L5.88785 3.00006L4.99441 3.00006C3.89745 3.00006 2.99994 3.90006 2.99994 5.00006L2.99994 19.0001C2.99994 20.1001 3.89745 21.0001 4.99441 21.0001L13.2415 21.0001"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M16.0001 5.5C16.0001 4.11929 17.1194 3 18.5001 3C19.8808 3 21.0001 4.11929 21.0001 5.5V8.66667C21.0001 9.40305 20.4032 10 19.6668 10H16.0001V5.5Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M16 6L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
