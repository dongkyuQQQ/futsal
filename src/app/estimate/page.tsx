'use client';

import { useState } from 'react';

interface PriceCalculation {
  width: number;
  length: number;
  area: number;
  grassType: 'TM35e+' | 'TM55e+';
  basePrice: number;
  totalPrice: number;
  materials: {
    grass: { amount: number; price: number };
    sand: { amount: number; price: number };
    rubber: { amount: number; price: number };
    tape: { amount: number; price: number };
    glue: { amount: number; price: number };
    installation: { price: number };
    misc: { price: number };
  };
  vat: number;
  subtotal: number;
}

export default function EstimatePage() {
  const [width, setWidth] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [grassType, setGrassType] = useState<'TM35e+' | 'TM55e+'>('TM55e+');
  const [calculation, setCalculation] = useState<PriceCalculation | null>(null);

  const calculatePrice = () => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    const area = w * l;

    const prices = {
      'TM55e+': {
        grass: 14500,          // 1m² 당 가격
        sandPerKg: 80,         // 규사 kg당 가격
        rubberPerKg: 1230,     // 고무칩 kg당 가격
        tapePerM2: 200,        // 조인트테이프 m당 가격
        gluePerKg: 4100,       // 본드(조인트) kg당 가격
        installationPerM2: 3000,// 시공비 m² 당 가격
      },
      'TM35e+': {
        grass: 12500,          // 더 낮은 가격으로 설정
        sandPerKg: 80,
        rubberPerKg: 1230,
        tapePerM2: 200,
        gluePerKg: 4100,
        installationPerM2: 3000,
      }
    };

    const p = prices[grassType];
    const materials = {
      grass: {
        amount: area,
        price: area * p.grass
      },
      sand: {
        amount: area * 30,     // 30kg/m²
        price: area * 30 * p.sandPerKg
      },
      rubber: {
        amount: area * 11,     // 11kg/m²
        price: area * 11 * p.rubberPerKg
      },
      tape: {
        amount: area * 0.45,   // 0.45m/m², 250m 단위
        price: area * 0.45 * p.tapePerM2
      },
      glue: {
        amount: area * 0.3,    // 0.3kg/m², 1통 = 15kg
        price: area * 0.3 * p.gluePerKg
      },
      installation: {
        price: area * p.installationPerM2
      },
      misc: {
        price: 500000         // 운반비 등 기타 비용
      }
    };

    // 결과에 부가세 추가 (18.2%)
    const subtotal = Object.values(materials).reduce(
      (sum, item) => sum + item.price,
      0
    );
    const vat = subtotal * 0.182;
    const totalPrice = subtotal + vat;

    setCalculation({
      width: w,
      length: l,
      area,
      grassType,
      basePrice: p.grass,
      totalPrice,
      materials,
      vat,
      subtotal,
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">견적 계산 및 상품 신청</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">원하시는 규격을 입력하시면 견적 계산 후 바로 신청하실 수 있습니다.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* STEP 1: 견적 계산 */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mr-2 sm:mr-3 text-sm sm:text-base">1</span>
            <h2 className="text-lg sm:text-xl font-bold">견적 계산</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                가로 (m)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="가로 길이를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                세로 (m)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="세로 길이를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                잔디 타입
              </label>
              <select
                value={grassType}
                onChange={(e) => setGrassType(e.target.value as 'TM35e+' | 'TM55e+')}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="TM55e+">TM55e+ (프리미엄)</option>
                <option value="TM35e+">TM35e+ (스탠다드)</option>
              </select>
            </div>
            <button
              onClick={calculatePrice}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              견적 계산하기
            </button>
          </div>
        </div>

        {/* STEP 2: 견적 결과 및 신청 */}
        {calculation && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center mb-6">
              <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mr-3">2</span>
              <h2 className="text-xl font-bold">견적 결과 및 신청</h2>
            </div>
            <div className="space-y-4">
              <p>총 면적: {calculation.area}m²</p>
              <div className="border-t pt-4">
                <h3 className="font-bold mb-2">소요 자재</h3>
                <ul className="space-y-2">
                  <li>잔디: {calculation.materials.grass.amount.toFixed(1)}m² ({calculation.materials.grass.price.toLocaleString()}원)</li>
                  <li>규사: {calculation.materials.sand.amount.toFixed(1)}kg ({calculation.materials.sand.price.toLocaleString()}원)</li>
                  <li>고무칩: {calculation.materials.rubber.amount.toFixed(1)}kg ({calculation.materials.rubber.price.toLocaleString()}원)</li>
                  <li>접착테이프: {calculation.materials.tape.amount.toFixed(1)}m ({calculation.materials.tape.price.toLocaleString()}원)</li>
                  <li>접착제: {calculation.materials.glue.amount.toFixed(1)}kg ({calculation.materials.glue.price.toLocaleString()}원)</li>
                  <li>시공비: {calculation.materials.installation.price.toLocaleString()}원</li>
                  <li>기타(운반비 등): {calculation.materials.misc.price.toLocaleString()}원</li>
                </ul>
              </div>
              <div className="border-t pt-4">
                <p className="mb-2">공급가액: {calculation.subtotal.toLocaleString()}원</p>
                <p className="mb-2">부가세(18.2%): {calculation.vat.toLocaleString()}원</p>
                <p className="text-xl font-bold mb-6">
                  총 견적가: {calculation.totalPrice.toLocaleString()}원
                </p>
                <a 
                  href={`/purchase?${new URLSearchParams({
                    width: width.toString(),
                    length: length.toString(),
                    grassType,
                    total: calculation.totalPrice.toString(),
                    calculation: JSON.stringify(calculation)
                  }).toString()}`}
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  상품 신청하기
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 