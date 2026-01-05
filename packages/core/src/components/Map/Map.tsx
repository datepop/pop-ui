'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { markerStyles } from './markerStyles';
import { useNaverMap } from './NaverMapContext';
import { useMap } from './useMap';

import type { IMapProps } from './types';

const Map = ({ options, onLoad }: IMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const { createMap } = useNaverMap();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const mapActions = useMap(map);
  const { width = '100%', height = '100%', ...restOptions } = options || {};

  const mapOptions = useMemo(() => restOptions, [JSON.stringify(restOptions)]);

  // Inject marker styles
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Check if styles already injected
    const existingStyle = document.getElementById('pop-ui-map-marker-styles');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'pop-ui-map-marker-styles';
    style.textContent = markerStyles;
    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      // Don't remove on unmount as other Map instances might need it
    };
  }, []);

  useEffect(() => {
    let mapInstance: naver.maps.Map | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    // Clean up previous map instance
    if (map) {
      map.destroy();
      setMap(null);
    }

    // Create map when container is valid
    if (containerRef.current && containerRef.current.isConnected) {
      const waitForNaverAndCreateMap = () => {
        if (containerRef.current && containerRef.current.isConnected) {
          mapInstance = createMap(containerRef, mapOptions as naver.maps.MapOptions);
          if (mapInstance) {
            setMap(mapInstance);
            return true;
          }
        }
        return false;
      };

      if (!waitForNaverAndCreateMap()) {
        // Retry periodically (max 5 seconds)
        let attempts = 0;
        const maxAttempts = 50; // 100ms * 50 = 5s

        intervalId = setInterval(() => {
          attempts++;
          if (waitForNaverAndCreateMap() || attempts >= maxAttempts) {
            if (intervalId) {
              clearInterval(intervalId);
              intervalId = null;
            }
          }
        }, 100);
      }

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
        if (mapInstance) {
          mapInstance.destroy();
          mapInstance = null;
        }
      };
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (mapInstance) {
        mapInstance.destroy();
        mapInstance = null;
      }
    };
  }, [createMap, mapOptions]);

  useEffect(() => {
    if (map && onLoad) {
      onLoad({ map, ...mapActions });
    }
  }, [map, onLoad, mapActions]);

  return (
    <div
      ref={containerRef}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

Map.displayName = 'Map';

export default Map;
