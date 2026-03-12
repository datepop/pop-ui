import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationOffice({ size = 24, ...props }: IIllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.15771 7.78947C9.15771 7.23719 9.60543 6.78947 10.1577 6.78947H21.4209C21.9732 6.78947 22.4209 7.23719 22.4209 7.78947V21H9.15771V7.78947Z"
        fill="#DAEFFF"
      />
      <path
        d="M1.57886 4C1.57886 3.44772 2.02657 3 2.57886 3H15.7368C16.289 3 16.7368 3.44772 16.7368 4V21H1.57886V4Z"
        fill="#B2DDFF"
      />
      <rect x="5.03101" y="5.2618" width="2.84211" height="2.84211" rx="0.5" fill="#53B1FD" />
      <rect x="10.4424" y="5.2618" width="2.84211" height="2.84211" rx="0.5" fill="#53B1FD" />
      <rect x="5.03101" y="9.99864" width="2.84211" height="2.84211" rx="0.5" fill="#53B1FD" />
      <rect x="10.4424" y="9.99864" width="2.84211" height="2.84211" rx="0.5" fill="#53B1FD" />
      <path
        d="M7.41724 21V18.1284C7.41724 17.4359 7.96896 16.8747 8.64981 16.8747H9.66521C10.3461 16.8747 10.8978 17.4359 10.8978 18.1284V21"
        fill="white"
      />
    </svg>
  );
}
