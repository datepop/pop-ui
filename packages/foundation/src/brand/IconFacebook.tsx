import type { IBrandIconProps } from '../types/brand';

export default function IconFacebook({ size = 24, ...props }: IBrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="12" cy="12" r="9.9" fill="#0866FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5543 21.7787V14.871H15.861L16.2966 12.0099H13.5543V10.1487C13.5543 9.36657 13.9404 8.60427 15.168 8.60427H16.4154V6.16887C16.4154 6.16887 15.2769 5.97087 14.1978 5.97087C11.9307 5.97087 10.4556 7.33707 10.4556 9.82197V12H7.94104V14.8611H10.4556V21.7802C10.9589 21.859 11.4747 21.9 12 21.9C12.5288 21.9 13.048 21.8585 13.5543 21.7787Z"
        fill="white"
      />
    </svg>
  );
}
