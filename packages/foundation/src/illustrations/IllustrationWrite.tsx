import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationWrite({ size = 24, ...props }: IIllustrationProps) {
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
        d="M19.1903 5.06336C20.0709 5.94402 20.0707 7.37146 19.1903 8.25224L17.5966 9.84599L17.5972 9.84668L10.8197 16.6243L6.03564 11.8403L12.0012 5.87473C12.0055 5.87033 12.0092 5.8653 12.0136 5.86092L14.4063 3.46822C15.287 2.58789 16.7145 2.58789 17.5952 3.46822L19.1903 5.06336Z"
        fill="#FFAE81"
      />
      <rect
        x="14.0085"
        y="3.86597"
        width="6.76603"
        height="1.69151"
        transform="rotate(45 14.0085 3.86597)"
        fill="#FFDFB3"
      />
      <ellipse
        cx="15.2051"
        cy="7.45491"
        rx="3.38301"
        ry="0.563836"
        transform="rotate(45 15.2051 7.45491)"
        fill="#FFAE81"
      />
      <ellipse
        cx="8.42949"
        cy="14.233"
        rx="3.38301"
        ry="0.563836"
        transform="rotate(45 8.42949 14.233)"
        fill="#FFDFB3"
      />
      <ellipse
        cx="16.4004"
        cy="6.25837"
        rx="3.38301"
        ry="0.563836"
        transform="rotate(45 16.4004 6.25837)"
        fill="#FFDFB3"
      />
      <path
        d="M10.8195 16.6249L6.03516 11.8406L5.45041 15.9338C5.34409 16.678 5.982 17.3159 6.72622 17.2096L10.8195 16.6249Z"
        fill="#FFDFB3"
      />
      <path
        d="M4.00073 20.0005H19.8807"
        stroke="#FFAE81"
        strokeWidth="2.19597"
        strokeLinecap="round"
      />
    </svg>
  );
}
