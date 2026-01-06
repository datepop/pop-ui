/** Location information for the map */
export interface IMapLocation {
  /** Display title/name of the location */
  title: string;
  /** Full address text */
  address: string;
  /** Latitude coordinate */
  latitude: number;
  /** Longitude coordinate */
  longitude: number;
}

/** Marker customization options */
export interface IMapMarker {
  /** Custom marker image URL */
  imageUrl?: string;
}

/** Direction/navigation options */
export interface IMapDirection {
  /** Custom direction URL (defaults to Naver Map search) */
  url?: string;
  /** Button label (default: '길찾기') */
  label?: string;
}

/** Toast message customization */
export interface IMapToast {
  /** Message when address is copied (default: '주소 복사 완료') */
  addressCopied?: string;
}

export interface IMapInfoProps {
  /** Location information (required) */
  location: IMapLocation;

  /** Marker customization (optional) */
  marker?: IMapMarker;

  /** Direction/navigation settings (optional) */
  direction?: IMapDirection;

  /** Toast message customization (optional) */
  toast?: IMapToast;

  /** Naver Cloud Platform Client ID (optional if provided via PopUIProvider) */
  naverClientId?: string;

  /** Total height of the component in pixels (default: 200) */
  height?: number;

  /** Callback when map preview is clicked (for expanding to full view) */
  onExpandRequest?: () => void;

  /** Callback when the entire component is clicked */
  onClick?: () => void;
}
