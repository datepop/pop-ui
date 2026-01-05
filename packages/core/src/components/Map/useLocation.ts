'use client';

import { useState, useEffect, useRef } from 'react';

import { toast } from '../Toast';

import type { ILocation, IUseLocationOptions } from './types';

const defaultErrorMessage = '위치 정보를 불러오는 데 실패했어요.';
const defaultErrorDescription = '위치 서비스 권한과 네트워크 상태를 확인해주세요.';

export const useLocation = ({
  isActive = false,
  errorMessage = defaultErrorMessage,
  errorDescription = defaultErrorDescription,
}: IUseLocationOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [position, setPosition] = useState<ILocation | null>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (isActive && typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;

      // Use requestAnimationFrame to defer state update
      requestAnimationFrame(() => {
        setIsLoading(true);
      });

      const geoOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setIsLoading(false);
          setIsError(false);
          isLoadingRef.current = false;
        },
        (error) => {
          setPosition(null);
          console.error('Geolocation error:', error);
          toast({
            message: `${errorMessage} ${errorDescription}`,
          });
          setIsLoading(false);
          setIsError(true);
          isLoadingRef.current = false;
        },
        geoOptions,
      );
    }
  }, [isActive, errorMessage, errorDescription]);

  return { position, isLoading, isError };
};
