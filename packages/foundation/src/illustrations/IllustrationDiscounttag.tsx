import type { IIllustrationProps } from '../types/illustration';

const DISCOUNTTAG_COLOR_MAP = {
  mint: { main: '#0FD3D8', light: '#72EEF1' },
  red: { main: '#FF8A8A', light: '#FECDCA' },
  purple: { main: '#9775FA', light: '#B197FC' },
} as const;

type ColorVariant = keyof typeof DISCOUNTTAG_COLOR_MAP;

function IllustrationDiscounttag({ size = 24, color = 'mint', ...props }: IIllustrationProps) {
  const { main, light } = DISCOUNTTAG_COLOR_MAP[color as ColorVariant] ?? DISCOUNTTAG_COLOR_MAP.mint;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.094 4.602a1.94 1.94 0 0 0-2.348.937l-2.417 4.699a1.9 1.9 0 0 0-.06 1.611l3.87 9.221a1.985 1.985 0 0 0 2.556 1.072l7.52-2.998a1.9 1.9 0 0 0 1.053-2.51l-3.87-9.222a1.98 1.98 0 0 0-1.2-1.109zm.162 3.653a.875.875 0 0 1 1.126.473.837.837 0 0 1-.463 1.105.874.874 0 0 1-1.126-.472.84.84 0 0 1 .463-1.106"
        fill={light}
        strokeWidth={0}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.816 5.042a1.98 1.98 0 0 1 2.58 0l4.132 3.542c.44.377.692.927.692 1.506v10.207a1.983 1.983 0 0 1-1.982 1.982H6.974a1.983 1.983 0 0 1-1.982-1.982V10.09c0-.579.253-1.129.692-1.506zm1.29 3.525a.874.874 0 1 0 .001 1.748.874.874 0 0 0 0-1.748"
        fill={main}
        strokeWidth={0}
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.643"
        d="m9.15 18.206 3.908-3.91"
      />
      <circle cx="13.059" cy="18.206" r="1.187" fill="#fff" />
      <circle cx="9.15" cy="14.296" r="1.187" fill="#fff" />
      <path
        d="M12.546 4.085c-.502-1.063-1.265-1.84-2.055-2.257s-1.537-.447-2.116-.174c-.579.274-1.031.868-1.212 1.744-.18.874-.065 1.958.436 3.02S8.864 8.26 9.654 8.677s1.537.447 2.116.174l.354.75-.171.073c-1.722.674-3.9-.477-5.034-2.66l-.11-.222c-1.133-2.4-.59-5.036 1.212-5.886L8.192.83c1.78-.697 4.046.555 5.143 2.881l.102.226c.996 2.338.433 4.838-1.313 5.661l-.354-.75c.579-.272 1.031-.867 1.212-1.743.18-.874.065-1.959-.436-3.021"
        fill="#D9D9D9"
        strokeWidth={0}
      />
      <path
        d="M13.93 6.353c-.026 1.456-.66 2.709-1.8 3.247l-.172.074-.007.001a.87.87 0 0 0-.15-.77l-.026-.055c.58-.273 1.032-.867 1.212-1.743.096-.467.107-.993.02-1.545z"
        fill={main}
        strokeWidth={0}
      />
      <path
        d="m11.775 8.85.026.056-.042-.05q.008-.002.016-.006M7.791 6.782c.494.878 1.172 1.527 1.868 1.895q.372.195.725.28a.87.87 0 0 0-.065.85c-1.2-.229-2.4-1.115-3.2-2.448z"
        fill="#D9D9D9"
        strokeWidth={0}
      />
    </svg>
  );
}

IllustrationDiscounttag.colorOptions = ['mint', 'red', 'purple'];

export default IllustrationDiscounttag;
