import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelFacilityDryer({
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
      <circle cx="6.77083" cy="8.35824" r="2.08333" stroke={color} strokeWidth="1.25" />
      <path
        d="M15.1195 7.12703L15.3025 6.94256C15.6126 6.62985 16.1251 6.6542 16.4042 6.9949C16.7033 7.36012 17.2629 7.35713 17.5581 6.98874L17.7268 6.7782"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M15.1182 9.79831L15.2684 9.64685C15.596 9.31649 16.1375 9.34222 16.4323 9.70215C16.7271 10.0621 17.2686 10.0878 17.5962 9.75745L17.7464 9.60599"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M5.52734 12.7329L6.44884 16.8996H9.69401L8.77252 12.7329"
        stroke={color}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M2.24609 8.35824C2.24609 9.78361 2.86561 11.057 3.83728 11.8976C5.35872 13.2139 7.6008 12.7208 9.56443 12.2832L13.0794 11.5L13.0794 5.27845L9.68183 4.48881C7.64069 4.01443 5.28768 3.4875 3.74259 4.90313C2.82555 5.74335 2.24609 6.97972 2.24609 8.35824Z"
        stroke={color}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}
