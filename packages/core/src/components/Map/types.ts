export interface ICoord {
  latitude: number;
  longitude: number;
}

export type TMarkerType = 'cluster' | 'popdeal' | 'pin' | 'pi' | 'pi-expanded';

export interface IBaseMarkerData {
  id: string;
  position: ICoord;
  type: TMarkerType;
  onClick?: (id: string) => void;
}

export interface IClusterMarkerData extends IBaseMarkerData {
  type: 'cluster';
  count: number;
}

export interface IPopdealMarkerData extends IBaseMarkerData {
  type: 'popdeal';
  title: string;
  price: number;
  discountRate?: number;
  originalPrice?: number;
  category?: string;
  active?: boolean;
}

export interface IPinMarkerData extends IBaseMarkerData {
  type: 'pin';
  name: string;
  icon?: string;
}

export interface IPiMarkerData extends IBaseMarkerData {
  type: 'pi' | 'pi-expanded';
  title: string;
  icon?: string;
  address?: string;
}

export type TMarkerData = IClusterMarkerData | IPopdealMarkerData | IPinMarkerData | IPiMarkerData;

export interface IMapOptions extends Partial<naver.maps.MapOptions> {
  width?: string | number;
  height?: string | number;
}

export interface IMapRef {
  map: naver.maps.Map | null;
  addMarker: (data: TMarkerData) => naver.maps.Marker | null;
  updateMarker: (id: string, updates: Partial<TMarkerData>) => void;
  clearMarkers: () => void;
  panTo: (coord: ICoord) => void;
  fitBounds: (coords: ICoord[]) => void;
}

export interface IMapProps {
  options?: IMapOptions;
  onLoad?: (mapRef: IMapRef) => void;
}

export interface INaverMapProviderProps {
  clientId: string;
  language?: 'ko' | 'en';
  children: React.ReactNode;
}

export interface INaverMapContextValue {
  naver: typeof naver | null;
  createMap: (
    containerRef: React.RefObject<HTMLDivElement | null>,
    options: naver.maps.MapOptions,
  ) => naver.maps.Map | null;
  maps: Record<string, naver.maps.Map | null>;
}

export interface IUseLocationOptions {
  isActive: boolean;
  errorMessage?: string;
  errorDescription?: string;
}

export interface ILocation {
  latitude?: number;
  longitude?: number;
}
