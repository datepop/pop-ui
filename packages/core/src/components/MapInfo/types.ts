export interface IMapInfoProps {
  /** Shop/store address (required) */
  address: string;
  /** Latitude coordinate (required) */
  latitude: number;
  /** Longitude coordinate (required) */
  longitude: number;
  /** Shop/store name (required) */
  shopTitle: string;
  /** Naver Cloud Platform Client ID (required) */
  naverClientId: string;

  /** Custom direction URL (optional, defaults to Naver Map search) */
  directionUrl?: string;
  /** Custom marker image URL (optional) */
  markerImageUrl?: string;
  /** Direction button label (default: '길찾기') */
  directionLabel?: string;
  /** Toast message when address is copied (default: '주소 복사 완료') */
  addressCopiedMessage?: string;
  /** Callback when map preview is clicked (for expanding to full view) */
  onExpandRequest?: () => void;
  /** Total height of the component (default: 200) */
  height?: number;
  /** Callback when address bar area is clicked */
  onClickMap?: () => void;
}
