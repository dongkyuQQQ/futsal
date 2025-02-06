'use client';

import { useEffect, useRef } from 'react';
import { Building } from '@/types/building';

interface BuildingMapProps {
  buildings: Building[];
  onBuildingSelect: (building: Building) => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function BuildingMap({ buildings, onBuildingSelect }: BuildingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 7,
        });

        buildings.forEach(building => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              building.coordinates.lat,
              building.coordinates.lng
            ),
            map: map,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            onBuildingSelect(building);
          });
        });
      });
    };
  }, [buildings]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
} 