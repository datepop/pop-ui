import { Path, Svg } from 'react-native-svg';

import { ColorGray900 } from '../../tokens/colors';

import type { IIconProps } from '../../types/icon.native';

export default function IconMenuCheck({
  size = 24,
  color = ColorGray900,
  variant = 'line',
  ...props
}: IIconProps) {
  const isFilled = variant === 'filled';

  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      {isFilled ? (
        <>
          <Path
            d="M17.1719 21.5115L19.6433 23.8456L24.1742 19.1774"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M19.7158 3.65424C21.1802 3.65424 22.3592 4.87222 22.3594 6.34174V17.8163L19.5742 20.6855L18.7168 19.8759C17.8134 19.0227 16.3894 19.0634 15.5361 19.9667C14.6831 20.8701 14.7237 22.2942 15.627 23.1474L16.8955 24.3456H6.62305C5.15887 24.3454 3.98071 23.1275 3.98047 21.6581V6.34174C3.98066 4.87236 5.15884 3.65448 6.62305 3.65424H19.7158ZM8.30273 16.5595C7.94397 16.5595 7.65271 16.8512 7.65234 17.2099C7.65234 17.5689 7.94375 17.8603 8.30273 17.8603H13.8496C14.2086 17.8603 14.5 17.5689 14.5 17.2099C14.4996 16.8512 14.2084 16.5595 13.8496 16.5595H8.30273ZM8.30273 13.3447C7.94389 13.3447 7.65257 13.6363 7.65234 13.9951C7.65261 14.3538 7.94391 14.6454 8.30273 14.6454H18.0352C18.3939 14.6453 18.6843 14.3537 18.6846 13.9951C18.6843 13.6364 18.3939 13.3448 18.0352 13.3447H8.30273ZM8.30273 10.1386C7.94389 10.1386 7.65257 10.4302 7.65234 10.789C7.65234 11.148 7.94375 11.4394 8.30273 11.4394H18.0352C18.394 11.4392 18.6846 11.1479 18.6846 10.789C18.6843 10.4303 18.3939 10.1388 18.0352 10.1386H8.30273Z"
            fill={color}
          />
        </>
      ) : (
        <>
          <Path
            d="M9.74414 11.46H18.3096"
            stroke={color}
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <Path
            d="M9.74414 14.666H18.3096"
            stroke={color}
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <Path
            d="M18.25 21.3341L20.7214 23.6682L25.2523 19"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M9.74414 17.8809H14.1248"
            stroke={color}
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <Path
            d="M22.7024 16.8665L22.7024 7.17064C22.7024 5.99213 21.7382 5.0279 20.5597 5.0279L8.66313 5.0279L7.70328 5.0279C6.52478 5.0279 5.56055 5.99213 5.56055 7.17064L5.56055 22.1698C5.56055 23.3483 6.52478 24.3125 7.70328 24.3125L16.5635 24.3125"
            stroke={color}
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </>
      )}
    </Svg>
  );
}
