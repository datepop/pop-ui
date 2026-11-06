import type { IIconLineOnlyProps } from '../types/icon';

export default function IconHotelReport({
  size = 16,
  color = '#333333',
  variant: _variant = 'line',
  ...props
}: IIconLineOnlyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(1.0433756 1.6741130)">
        <path
          d="M6.96002 0.5C9.73336 0.5 11.98 2.74667 11.98 5.52V10.0067C11.98 10.2 11.82 10.36 11.6267 10.36H2.29336C2.10002 10.36 1.94002 10.2 1.94002 10.0067V5.52C1.94002 2.74667 4.19336 0.5 6.96002 0.5Z"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeMiterlimit="10"
        />
        <path
          d="M1.39333 10.3576H12.52C13.0134 10.3576 13.4133 10.7576 13.4133 11.251V11.2576C13.4133 11.751 13.0134 12.151 12.52 12.151H1.39333C0.899959 12.151 0.5 11.751 0.5 11.2576V11.251C0.5 10.7576 0.899959 10.3576 1.39333 10.3576Z"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeMiterlimit="10"
        />
      </g>
      <g transform="translate(7.315023 4.1683755)">
        <path
          d="M0.683304 0C0.967557 0 1.19825 0.230698 1.19825 0.514951V3.54904C1.19825 3.83329 0.967557 4.06399 0.683304 4.06399C0.399051 4.06399 0.168354 3.83329 0.168354 3.54904V0.514951C0.168354 0.230698 0.399051 0 0.683304 0Z"
          fill={color}
        />
        <path
          d="M0.690034 5.04095C1.06972 5.04095 1.37663 5.34787 1.37663 5.72756C1.37663 6.10725 1.06972 6.41416 0.690034 6.41416C0.310344 6.41416 0 6.10725 0 5.72756C0 5.34787 0.304164 5.04095 0.683167 5.04095H0.690034Z"
          fill={color}
        />
      </g>
    </svg>
  );
}
