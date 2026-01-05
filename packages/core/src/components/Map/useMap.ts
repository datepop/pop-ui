'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { makeMarkerClustering } from './markerClustering';
import { getMarkerHTML } from './markerStyles';
import { useNaverMap } from './NaverMapContext';

import type { IClusterMarkerData, ICoord, TMarkerData } from './types';

export const useMap = (map: naver.maps.Map | null) => {
  const { naver } = useNaverMap();
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);
  const markerMapRef = useRef<Map<string, { marker: naver.maps.Marker; data: TMarkerData }>>(
    new Map(),
  );
  const clusterRef = useRef<ReturnType<typeof makeMarkerClustering> | null>(null);

  const addMarker = useCallback(
    (data: TMarkerData) => {
      if (!map || !naver) return null;

      const content = getMarkerHTML(data);

      const marker = new naver.maps.Marker({
        ...data,
        position: new naver.maps.LatLng(data.position.latitude, data.position.longitude),
        map,
        icon: {
          content,
        },
      });

      // Click event handler
      if (data.onClick) {
        naver.maps.Event.addListener(marker, 'click', () => {
          data.onClick!(data.id);
        });
      }

      setMarkers((prev) => [...prev, marker]);
      markerMapRef.current.set(data.id, { marker, data });
      return marker;
    },
    [map, naver],
  );

  const updateMarker = useCallback(
    (id: string, updates: Partial<TMarkerData>) => {
      const markerInfo = markerMapRef.current.get(id);
      if (!markerInfo || !naver) {
        return;
      }

      const { marker, data } = markerInfo;
      const updatedData = { ...data, ...updates } as TMarkerData;

      // Update marker DOM element attributes directly
      const markerElement = marker.getElement();
      if (markerElement) {
        const markerDiv = markerElement.querySelector('.popdeal-marker');
        if (markerDiv && 'active' in updates) {
          markerDiv.setAttribute('active', String(!!updates.active));
        }
      }

      // Update markerMap
      markerMapRef.current.set(id, { marker, data: updatedData });
    },
    [naver],
  );

  const clearMarkers = useCallback(() => {
    markers.forEach((marker) => {
      if (marker) {
        marker.setMap(null);
      }
    });
    setMarkers([]);
    markerMapRef.current.clear();
    if (clusterRef.current) {
      clusterRef.current.setMap(null);
      clusterRef.current = null;
    }
  }, [markers]);

  const panTo = useCallback(
    (coord: ICoord) => {
      if (!map || !naver) return;
      map.panTo(new naver.maps.LatLng(coord.latitude, coord.longitude));
    },
    [map, naver],
  );

  const fitBounds = useCallback(
    (coords: ICoord[]) => {
      if (!map || !naver || coords.length === 0) return;

      const bounds = new naver.maps.LatLngBounds(
        new naver.maps.LatLng(coords[0].latitude, coords[0].longitude),
        new naver.maps.LatLng(coords[0].latitude, coords[0].longitude),
      );

      coords.forEach((coord) => {
        bounds.extend(new naver.maps.LatLng(coord.latitude, coord.longitude));
      });

      map.fitBounds(bounds);
    },
    [map, naver],
  );

  useEffect(() => {
    if (!naver || !map || markers.length === 0) return;

    const MarkerClustering = makeMarkerClustering(naver);
    const clusterData: IClusterMarkerData = {
      id: 'cluster',
      type: 'cluster',
      count: 0,
      position: { latitude: 0, longitude: 0 },
    };
    const htmlClusterMarker = {
      content: getMarkerHTML(clusterData),
      size: new naver.maps.Size(96, 96),
      anchor: new naver.maps.Point(20, 20),
    };

    const newCluster = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 17,
      map,
      markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: [htmlClusterMarker],
      indexGenerator: [10, 100, 200, 500, 1000],
      averageCenter: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      stylingFunction: (clusterMarker: { getElement: () => Element }, count: number) => {
        if (clusterMarker && typeof clusterMarker.getElement === 'function') {
          const textElement = clusterMarker.getElement().querySelector('.cluster-marker-text');
          if (textElement) {
            textElement.textContent = String(count);
          }
        }
      },
    });

    clusterRef.current = newCluster;

    return () => {
      newCluster.setMap(null);
    };
  }, [naver, map, markers]);

  return { addMarker, updateMarker, clearMarkers, panTo, fitBounds };
};
