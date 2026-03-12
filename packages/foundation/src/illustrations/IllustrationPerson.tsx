import type { IIllustrationProps } from '../types/illustration';

export default function IllustrationPerson({ size = 24, ...props }: IIllustrationProps) {
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
        d="M9.89704 12.2964H14.5273C17.7816 12.2964 20.4134 14.9392 20.4134 18.1825V18.947C20.4134 20.0827 19.4961 21 18.3604 21H6.05304C4.91732 21 4 20.0827 4 18.947V18.1825C4 14.9283 6.64274 12.2964 9.88611 12.2964H9.89704Z"
        fill="#8BCAFB"
      />
      <path
        d="M12.2126 10.9984C14.6974 10.9984 16.7118 8.98406 16.7118 6.49921C16.7118 4.01437 14.6974 2 12.2126 2C9.72774 2 7.71338 4.01437 7.71338 6.49921C7.71338 8.98406 9.72774 10.9984 12.2126 10.9984Z"
        fill="#8BCAFB"
      />
    </svg>
  );
}
