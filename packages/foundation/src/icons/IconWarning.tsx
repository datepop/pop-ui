import { ColorGray900 } from "../tokens/colors";

import type { IconProps } from "../types/icon";

const getStrokeWidth = (size: number) => {
  if (size >= 40) return 2.5;
  if (size >= 32) return 2;
  if (size >= 24) return 1.5;
  if (size >= 20) return 1.25;
  return 1;
};

export default function IconWarning({
  size = 24,
  color = ColorGray900,
  ...props
}: IconProps) {
  const strokeWidth = getStrokeWidth(size);

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
        d="M11.9923 8.38782C12.4291 8.38782 12.7836 8.7423 12.7836 9.17907V13.8411C12.7836 14.2779 12.4291 14.6324 11.9923 14.6324C11.5556 14.6324 11.2011 14.2779 11.2011 13.8411V9.17907C11.2011 8.7423 11.5556 8.38782 11.9923 8.38782Z"
        fill={color}
      />
      <path
        d="M12.0027 16.1336C12.5861 16.1336 13.0577 16.6051 13.0577 17.1886C13.0577 17.772 12.5861 18.2436 12.0027 18.2436C11.4192 18.2436 10.9424 17.772 10.9424 17.1886C10.9424 16.6051 11.4097 16.1336 11.9921 16.1336H12.0027Z"
        fill={color}
      />
      <path
        d="M2.34978 18.1694L10.728 4.76432C11.3155 3.82432 12.6845 3.82432 13.272 4.76432L21.6502 18.1694C22.2746 19.1685 21.5563 20.4644 20.3782 20.4644H3.62178C2.44362 20.4644 1.72536 19.1685 2.34978 18.1694Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
