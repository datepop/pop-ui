import { IIllustrationProps } from '../types/illustration';

export default function IllustrationFolder({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <rect width="8.4" height="19.428" x="18.399" y="4" fill="#53B1FD" rx="1.8"></rect>
      <rect width="23.999" height="15.999" x="4" y="7.429" fill="#D8D8D8" rx="1.8"></rect>
      <rect width="8.4" height="19.428" x="11.2" y="6.286" fill="#6DE372" rx="1.8"></rect>
      <rect width="23.999" height="15.999" x="4" y="9.713" fill="#F6F6F6" rx="1.8"></rect>
      <rect width="8.4" height="19.428" x="4" y="8.571" fill="#FF6C6C" rx="1.8"></rect>
      <rect width="23.999" height="15.999" x="4" y="12" fill="#FCC419" rx="1.8"></rect>
    </svg>
  );
}
