import { ColorGray900 } from '../tokens/colors';

import type { IIconFilledOnlyProps } from '../types/icon';

export default function IconMail({
  size = 24,
  color = ColorGray900,
  variant: _variant = 'filled',
  ...props
}: IIconFilledOnlyProps) {
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
        d="M22.3852 6.80939C22.5448 6.71628 22.75 6.81522 22.75 7V17C22.75 18.5188 21.5188 19.75 20 19.75H4C2.48122 19.75 1.25 18.5188 1.25 17V7C1.25 6.81526 1.45415 6.71625 1.61373 6.80934L10.6143 12.0596C11.4705 12.559 12.5295 12.559 13.3857 12.0596L22.3852 6.80939ZM20 4.25C20.6335 4.25 21.2165 4.46474 21.6811 4.82497C21.926 5.01481 21.863 5.37795 21.5954 5.53409L12.6299 10.7646C12.2407 10.9916 11.7593 10.9916 11.3701 10.7646L2.40358 5.53402C2.13598 5.37791 2.07293 5.01483 2.3178 4.82503C2.78273 4.46465 3.36619 4.25 4 4.25H20Z"
        fill={color}
      />
    </svg>
  );
}
