import { IIllustrationProps } from '../types/illustration';

export default function IllustrationVendingmachine({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="#B2DDFF" d="M6 2.5A1.5 1.5 0 0 1 7.5 1h9A1.5 1.5 0 0 1 18 2.5V21H6z"></path>
      <rect width="14" height="1.5" x="5" y="21" fill="#53B1FD" rx="0.75"></rect>
      <rect width="6" height="1" x="9" y="12" fill="#53B1FD" rx="0.5"></rect>
      <rect width="10" height="8" x="7" y="2" fill="#E8F5FF" rx="1"></rect>
      <rect width="4" height="1" x="8" y="3" fill="#D8D8D8" rx="0.5"></rect>
      <rect width="4" height="1" x="8" y="5" fill="#D8D8D8" rx="0.5"></rect>
      <rect width="2" height="1" x="8" y="7" fill="#D8D8D8" rx="0.5"></rect>
    </svg>
  );
}
