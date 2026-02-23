import { IIllustrationProps } from '../types/illustration';

export default function IllustrationBell({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="2.4" height="4.2" x="10.8" y="1.8" fill="#FF922B" rx="1.2"></rect>
      <path fill="#FF922B" d="M15.23 18.775c0 1.77-1.44 3.21-3.21 3.21s-3.21-1.44-3.21-3.21"></path>
      <path
        fill="#FCC419"
        d="M19.43 18.775H4.56c-.8 0-1.32-.83-.97-1.55l1.29-2.63c.07-.15.11-.31.11-.47v-3.9c0-3.87 3.14-7.01 7.01-7.01s7.01 3.14 7.01 7.01v3.9c0 .16.04.33.11.47l1.29 2.63c.35.71-.17 1.55-.97 1.55z"
      ></path>
    </svg>
  );
}
