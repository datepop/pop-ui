'use client';

import { createContext, useCallback, useContext, useEffect, useState, type RefObject } from 'react';

import type { INaverMapContextValue, INaverMapProviderProps } from './types';

const NaverMapContext = createContext<INaverMapContextValue | null>(null);

const NAVER_MAP_SCRIPT_ID = 'naver-map-script';

const loadNaverMapScript = (clientId: string, language: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 이미 로드된 경우
    if (typeof window !== 'undefined' && window.naver?.maps) {
      resolve();
      return;
    }

    // 이미 스크립트 태그가 있는 경우
    const existingScript = document.getElementById(NAVER_MAP_SCRIPT_ID);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () =>
        reject(new Error('Failed to load Naver Map script')),
      );
      return;
    }

    // 새 스크립트 생성
    const script = document.createElement('script');
    script.id = NAVER_MAP_SCRIPT_ID;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&language=${language}`;
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error('Failed to load Naver Map script'));
    };

    document.head.appendChild(script);
  });
};

export const NaverMapProvider = ({
  clientId,
  language = 'ko',
  children,
}: INaverMapProviderProps) => {
  const [naverApi, setNaverApi] = useState<typeof window.naver | null>(null);
  const [maps, setMaps] = useState<Record<string, naver.maps.Map | null>>({});
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    loadNaverMapScript(clientId, language)
      .then(() => {
        if (window.naver) {
          setNaverApi(window.naver);
        }
      })
      .catch((err) => {
        console.error('Naver Map script loading failed:', err);
        setError(err);
      });
  }, [clientId, language]);

  const createMap = useCallback(
    (containerRef: RefObject<HTMLDivElement | null>, options: naver.maps.MapOptions) => {
      // window.naver를 직접 확인하여 사용
      const api = naverApi || (typeof window !== 'undefined' ? window.naver : null);

      if (!api) {
        return null;
      }

      // naver 상태가 업데이트되지 않았다면 수동으로 업데이트
      if (!naverApi && window.naver) {
        setNaverApi(window.naver);
      }

      if (!containerRef.current) {
        return null;
      }

      const element = containerRef.current;

      // DOM 요소가 실제로 연결되어 있는지 확인
      if (!element.isConnected) {
        return null;
      }

      try {
        // 안전한 기본 옵션 설정
        const safeOptions: naver.maps.MapOptions = {
          center: new api.maps.LatLng(37.5665, 126.978), // 서울 시청 기본 좌표
          zoom: 11,
          maxZoom: 20,
          minZoom: 11,
          mapTypeControl: false,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
          ...options,
        };

        const mapInstance = new api.maps.Map(element, safeOptions);

        // 상태 업데이트
        setMaps((prev) => {
          const id = element.getAttribute('id') || 'default';
          return { ...prev, [id]: mapInstance };
        });

        return mapInstance;
      } catch (err) {
        console.error('Map creation error:', err);
        return null;
      }
    },
    [naverApi],
  );

  if (error) {
    console.error('NaverMapProvider error:', error);
  }

  return (
    <NaverMapContext.Provider value={{ naver: naverApi, createMap, maps }}>
      {children}
    </NaverMapContext.Provider>
  );
};

export const useNaverMap = () => {
  const context = useContext(NaverMapContext);
  if (!context) {
    throw new Error('useNaverMap must be used within NaverMapProvider');
  }
  return context;
};
