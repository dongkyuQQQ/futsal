export interface Building {
  id: string;
  name: string;
  address: {
    road: string;    // 도로명 주소
    jibun: string;   // 지번 주소
    sido: string;    // 시/도
    sigungu: string; // 시/군/구
  };
  coordinates: {
    lat: number;     // 위도
    lng: number;     // 경도
  };
  details: {
    totalArea: number;       // 전체 면적
    rooftopArea: number;     // 옥상 면적
    floors: number;          // 층수
    constructionYear: number;// 건축년도
    structure: string;       // 구조
  };
  suitability: {
    isStructurallySound: boolean;  // 구조 안전성
    hasElevator: boolean;          // 엘리베이터 유무
    isAccessible: boolean;         // 옥상 접근성
  };
  status: 'potential' | 'investigating' | 'approved' | 'rejected';
} 