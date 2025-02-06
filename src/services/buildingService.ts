import axios from 'axios';
import { Building } from '@/types/building';

interface BuildingApiResponse {
  response: {
    body: {
      items: {
        item: any[];
      };
    };
  };
}

const BUILDING_API_KEY = process.env.NEXT_PUBLIC_BUILDING_API_KEY;
const VWORLD_API_KEY = process.env.NEXT_PUBLIC_VWORLD_API_KEY;

export class BuildingService {
  static async getBuildingsByRegion(sido: string, sigungu: string): Promise<Building[]> {
    try {
      const response = await axios.get<BuildingApiResponse>(
        `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo`,
        {
          params: {
            serviceKey: process.env.NEXT_PUBLIC_BUILDING_API_KEY,
            sigunguCd: sigungu,
            bjdongCd: '',
            platGbCd: '',
            bun: '',
            ji: '',
            startDate: '',
            endDate: '',
            numOfRows: '100',
            pageNo: '1',
          },
        }
      );

      const buildings = this.filterSuitableBuildings(response.data.response.body.items.item);
      
      // API 응답을 Building 타입으로 변환
      return buildings.map(building => ({
        id: building.mgmBldrgstPk,
        name: building.bldNm || '이름 없음',
        address: {
          road: building.newPlatPlc,
          jibun: building.platPlc,
          sido: building.sigunguCd.substring(0, 2),
          sigungu: building.sigunguCd,
        },
        coordinates: {
          lat: 37.5665, // 임시 좌표
          lng: 126.9780, // 임시 좌표
        },
        details: {
          totalArea: parseFloat(building.totArea),
          rooftopArea: parseFloat(building.platArea),
          floors: parseInt(building.grndFlrCnt),
          constructionYear: parseInt(building.archYear),
          structure: building.strctCd,
        },
        suitability: {
          isStructurallySound: true, // 기본값
          hasElevator: true, // 기본값
          isAccessible: true, // 기본값
        },
        status: 'potential',
      }));
    } catch (error) {
      console.error('Failed to fetch buildings:', error);
      throw error;
    }
  }

  private static filterSuitableBuildings(buildings: any[]) {
    return buildings.filter(building => {
      return (
        parseFloat(building.platArea) >= 400 &&
        parseInt(building.archYear) >= 1990 &&
        (building.strctCd === '21' || building.strctCd === '22')
      );
    });
  }
} 