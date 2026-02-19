import { IIllustrationProps } from '../types/illustration';

export default function IllustrationBell({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <rect width="3.2" height="5.6" x="14.4" y="2.4" fill="#FF922B" rx="1.6"></rect>
      <path
        fill="#FF922B"
        d="M20.307 25.033c0 2.36-1.92 4.28-4.28 4.28s-4.28-1.92-4.28-4.28"
      ></path>
      <path
        fill="#FCC419"
        d="M25.907 25.033H6.08a1.434 1.434 0 0 1-1.293-2.066l1.72-3.507c.093-.2.146-.413.146-.627v-5.2c0-5.16 4.187-9.346 9.347-9.346s9.347 4.186 9.347 9.346v5.2c0 .214.053.44.146.627l1.72 3.507c.467.946-.226 2.066-1.293 2.066z"
      ></path>
    </svg>
  );
}
