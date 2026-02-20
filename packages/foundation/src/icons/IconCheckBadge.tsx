import { ColorGray900 } from '../tokens/colors';
import { IIconProps } from '../types/icon';

export default function IconCheckBadge({
  size = 24,
  color = ColorGray900,
  variant = 'filled',
  ...props
}: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill={color}
        d="M11.894 1.47a.5.5 0 0 1 .732.196l.848 1.755a.5.5 0 0 0 .487.281l1.945-.143a.5.5 0 0 1 .535.536l-.143 1.944a.5.5 0 0 0 .281.487l1.756.849a.5.5 0 0 1 .196.731l-1.096 1.613a.5.5 0 0 0 0 .562l1.096 1.612a.5.5 0 0 1-.196.732l-1.756.848a.5.5 0 0 0-.281.487l.143 1.945a.5.5 0 0 1-.535.535l-1.945-.143a.5.5 0 0 0-.487.281l-.848 1.756a.5.5 0 0 1-.732.196l-1.612-1.096a.5.5 0 0 0-.563 0L8.107 18.53a.5.5 0 0 1-.732-.196l-.848-1.756a.5.5 0 0 0-.487-.28l-1.945.142a.5.5 0 0 1-.535-.535l.143-1.945a.5.5 0 0 0-.281-.487l-1.756-.848a.5.5 0 0 1-.196-.732l1.097-1.612a.5.5 0 0 0 0-.562L1.47 8.106a.5.5 0 0 1 .196-.731l1.756-.849a.5.5 0 0 0 .281-.487L3.56 4.095a.5.5 0 0 1 .535-.536l1.945.143a.5.5 0 0 0 .487-.28l.848-1.756a.5.5 0 0 1 .732-.196l1.612 1.096a.5.5 0 0 0 .563 0z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.667"
        d="m6.874 9.999 2.5 2.5 4.376-4.583"
      ></path>
    </svg>
  );
}
