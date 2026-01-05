/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Naver Maps API Type Definitions
 * These are minimal type definitions for the Naver Maps JavaScript API
 */

declare namespace naver {
  namespace maps {
    class Map {
      constructor(element: HTMLElement, options?: MapOptions);
      destroy(): void;
      setZoom(zoom: number): void;
      getZoom(): number;
      panTo(coord: LatLng): void;
      fitBounds(bounds: LatLngBounds): void;
      getBounds(): LatLngBounds;
      getProjection(): Projection;
      morph(coord: LatLng, zoom: number): void;
    }

    class Marker {
      constructor(options?: MarkerOptions);
      setMap(map: Map | null): void;
      getMap(): Map | null;
      getPosition(): LatLng;
      getElement(): HTMLElement;
      setIcon(icon: any): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
      clone(): LatLng;
    }

    class LatLngBounds {
      constructor(sw: LatLng, ne: LatLng);
      extend(latlng: LatLng): void;
      getNE(): LatLng;
      getSW(): LatLng;
      hasLatLng(latlng: LatLng): boolean;
    }

    class Point {
      constructor(x: number, y: number);
      x: number;
      y: number;
      add(x: number, y: number): void;
    }

    class Size {
      constructor(width: number, height: number);
      width: number;
      height: number;
    }

    interface MapOptions {
      center?: LatLng | { lat: number; lng: number };
      zoom?: number;
      minZoom?: number;
      maxZoom?: number;
      draggable?: boolean;
      keyboardShortcuts?: boolean;
      mapTypeControl?: boolean;
      scaleControl?: boolean;
      logoControl?: boolean;
      mapDataControl?: boolean;
      zoomControl?: boolean;
    }

    interface MarkerOptions {
      position?: LatLng;
      map?: Map;
      icon?: {
        content?: string;
        size?: Size;
        anchor?: Point;
      };
    }

    interface Projection {
      getDistance(from: LatLng, to: LatLng): number;
      fromCoordToOffset(coord: LatLng): Point;
      fromOffsetToCoord(point: Point): LatLng;
    }

    const Event: {
      addListener(target: any, event: string, callback: (...args: any[]) => void): any;
      removeListener(listener: any): void;
    };

    const Util: {
      ClassExtend(child: any, parent: any, methods: any): void;
      extend(target: any, ...sources: any[]): any;
      noop(): void;
      bind(fn: (...args: any[]) => any, context: any): (...args: any[]) => any;
      forEach(obj: any, callback: (value: any, key: any) => void): void;
      isFunction(obj: any): boolean;
      isArray(obj: any): boolean;
    };

    class OverlayView {
      setMap(map: Map | null): void;
      getMap(): Map | null;
      getProjection(): Projection;
      set(key: string, value: any): void;
      get(key: string): any;
    }
  }
}

interface Window {
  naver?: typeof naver;
}
