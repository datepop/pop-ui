import { IIllustrationProps } from '../types/illustration';

export default function IllustrationFolder({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="6.3" height="14.571" x="13.8" y="3" fill="#53B1FD" rx="1.35"></rect>
      <rect width="17.999" height="11.999" x="3" y="5.572" fill="#D8D8D8" rx="1.35"></rect>
      <rect width="6.3" height="14.571" x="8.4" y="4.714" fill="#6DE372" rx="1.35"></rect>
      <rect width="17.999" height="11.999" x="3" y="7.285" fill="#F6F6F6" rx="1.35"></rect>
      <rect width="6.3" height="14.571" x="3" y="6.429" fill="#FF6C6C" rx="1.35"></rect>
      <rect width="17.999" height="11.999" x="3" y="9" fill="#FCC419" rx="1.35"></rect>
    </svg>
  );
}
