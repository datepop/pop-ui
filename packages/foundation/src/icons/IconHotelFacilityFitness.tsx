import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityFitness({
  size = 20,
  color = '#333333',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.4668 12.1079L12.1808 7.39387"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="9.99856"
      />
      <rect
        x="4.60352"
        y="9.37549"
        width="8.75"
        height="2.5"
        rx="0.435417"
        transform="rotate(45 4.60352 9.37549)"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="9.99856"
      />
      <rect
        x="3.97266"
        y="12.3057"
        width="5.5"
        height="1.91667"
        rx="0.435417"
        transform="rotate(45 3.97266 12.3057)"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="9.99856"
      />
      <rect
        x="15.3965"
        y="10.6245"
        width="8.75"
        height="2.5"
        rx="0.435417"
        transform="rotate(-135 15.3965 10.6245)"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="9.99856"
      />
      <rect
        x="16.0273"
        y="7.69434"
        width="5.5"
        height="1.91667"
        rx="0.435417"
        transform="rotate(-135 16.0273 7.69434)"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="9.99856"
      />
    </svg>
  );
}
