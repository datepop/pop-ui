'use client';

import { IconMap, IconMapMarker, ColorAqua500, ColorGray800 } from '@pop-ui/foundation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePopUIConfig } from '../../theme';
import Button from '../Button';
import { Map, NaverMapProvider } from '../Map';
import { toast } from '../Toast';
import styles from './styles.module.scss';

import type { IMapInfoProps } from './types';
import type { IMapRef, TMarkerData, TMarkerType } from '../Map/types';

const ADDRESS_BAR_HEIGHT = 60;

export const MapInfo = ({
  onClickMap: onClickMapArea,
  address,
  markerImageUrl,
  shopTitle,
  directionUrl,
  latitude,
  longitude,
  naverClientId: naverClientIdProp,
  onExpandRequest,
  height = 200,
  directionLabel = '길찾기',
  addressCopiedMessage = '주소 복사 완료',
}: IMapInfoProps) => {
  const config = usePopUIConfig();
  const naverClientId = naverClientIdProp || config.naverClientId;

  const [mapPreviewRef, setMapPreviewRef] = useState<IMapRef | null>(null);

  // Calculate heights
  const previewHeight = height - ADDRESS_BAR_HEIGHT;

  const onMapPreviewLoad = useCallback((ref: IMapRef) => {
    if (ref && ref.map) {
      setMapPreviewRef(ref);
    }
  }, []);

  const handleExpandClick = useCallback(() => {
    onExpandRequest?.();
  }, [onExpandRequest]);

  const createMapMarker = useCallback(
    (mapRef: IMapRef | null, data: TMarkerData, callback?: () => void) => {
      if (mapRef && mapRef.map && latitude && longitude) {
        try {
          mapRef.addMarker(data);
          callback?.();
        } catch (error) {
          console.error('Error creating map marker:', error);
        }
      }
    },
    [latitude, longitude],
  );

  const createShopMapMarker = useCallback(
    (mapRef: IMapRef | null, type: Extract<TMarkerType, 'pi' | 'pi-expanded'>) => {
      if (mapRef && mapRef.map && latitude && longitude) {
        mapRef.clearMarkers();
        createMapMarker(
          mapRef,
          {
            id: `shop-marker-${shopTitle}`,
            type,
            position: { latitude, longitude },
            title: shopTitle,
            icon: markerImageUrl ?? undefined,
            address: address ?? undefined,
          },
          () => {
            mapRef.panTo({ latitude, longitude });
          },
        );
      }
    },
    [latitude, longitude, shopTitle, markerImageUrl, address, createMapMarker],
  );

  // Create shop marker on preview map
  useEffect(() => {
    if (latitude && longitude && mapPreviewRef) {
      createShopMapMarker(mapPreviewRef, 'pi');
    }
  }, [mapPreviewRef, latitude, longitude, createShopMapMarker]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      setMapPreviewRef(null);
    };
  }, []);

  const handleAddressCopy = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(address);
      toast(addressCopiedMessage);
    }
  }, [address, addressCopiedMessage]);

  const directionHref = useMemo(() => {
    if (directionUrl) return directionUrl;
    return `https://map.naver.com/p/search/${encodeURIComponent(shopTitle)}`;
  }, [directionUrl, shopTitle]);

  // Early return after all hooks
  if (!naverClientId) {
    return (
      <div className={styles.MapInfo} style={{ height }}>
        <div className={styles.MapInfo__NoClientId}>
          naverClientId가 필요합니다. PopUIProvider 또는 props로 전달해주세요.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.MapInfo} style={{ height }} onClick={onClickMapArea}>
      <NaverMapProvider clientId={naverClientId}>
        <div className={styles.MapInfo__Preview} onClick={handleExpandClick}>
          <Map
            onLoad={onMapPreviewLoad}
            options={{
              width: '100%',
              height: `${previewHeight}px`,
              center: {
                lat: latitude,
                lng: longitude,
              },
              zoom: 15,
              minZoom: 15,
              maxZoom: 15,
              draggable: false,
              keyboardShortcuts: false,
              mapTypeControl: false,
              scaleControl: false,
              logoControl: false,
              mapDataControl: false,
              zoomControl: false,
            }}
          />
          {onExpandRequest && (
            <div className={styles.MapInfo__ExpandButton}>
              <IconMap color={ColorGray800} size={18} />
            </div>
          )}
        </div>
      </NaverMapProvider>

      <div className={styles.MapInfo__AddressBar}>
        <div className={styles.MapInfo__AddressContent}>
          <IconMapMarker color={ColorAqua500} size={24} filled />
          <span
            className={styles.MapInfo__Address}
            onClick={handleAddressCopy}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleAddressCopy()}
          >
            {address}
          </span>
        </div>
        <a
          className={styles.MapInfo__DirectionLink}
          href={directionHref}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="basic" size="sm" className={styles.MapInfo__DirectionButton}>
            {directionLabel}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default MapInfo;
