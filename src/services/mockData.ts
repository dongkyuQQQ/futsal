import { Building } from '@/types/building';

export const mockBuildings: Building[] = [
  {
    id: '1',
    name: '테스트 빌딩 1',
    address: {
      road: '서울시 종로구 종로 1길 1',
      jibun: '종로동 1-1',
      sido: '11',
      sigungu: '110',
    },
    coordinates: {
      lat: 37.5665,
      lng: 126.9780,
    },
    details: {
      totalArea: 1000,
      rooftopArea: 500,
      floors: 10,
      constructionYear: 2000,
      structure: '철근콘크리트',
    },
    suitability: {
      isStructurallySound: true,
      hasElevator: true,
      isAccessible: true,
    },
    status: 'potential',
  },
  // 더 많은 테스트 데이터 추가 가능
]; 