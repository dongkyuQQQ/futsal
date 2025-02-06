'use client';

import { useState, useEffect } from 'react';
import { Building } from '@/types/building';
import BuildingMap from '@/components/BuildingMap';
import { mockBuildings } from '@/services/mockData';

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  useEffect(() => {
    // 임시로 mock 데이터 사용
    setBuildings(mockBuildings);
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">가능 부지 현황</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="h-[600px] bg-white rounded-lg shadow">
            <BuildingMap 
              buildings={buildings}
              onBuildingSelect={setSelectedBuilding}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">건물 정보</h2>
          {selectedBuilding ? (
            <div className="space-y-4">
              <p><span className="font-bold">건물명:</span> {selectedBuilding.name}</p>
              <p><span className="font-bold">주소:</span> {selectedBuilding.address.road}</p>
              <p><span className="font-bold">옥상 면적:</span> {selectedBuilding.details.rooftopArea}㎡</p>
              <p><span className="font-bold">건축년도:</span> {selectedBuilding.details.constructionYear}</p>
              <p><span className="font-bold">구조:</span> {selectedBuilding.details.structure}</p>
            </div>
          ) : (
            <p className="text-gray-500">지도에서 건물을 선택해주세요</p>
          )}
        </div>
      </div>
    </div>
  );
} 